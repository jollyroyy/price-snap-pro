import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchQuery } = await req.json();
    console.log('Received search query:', searchQuery);

    const GOOGLE_API_KEY = Deno.env.get('GOOGLE_API_KEY');
    if (!GOOGLE_API_KEY) {
      throw new Error('GOOGLE_API_KEY not configured');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get products matching the search query
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select(`
        *,
        price_data (*)
      `)
      .ilike('name', `%${searchQuery}%`)
      .limit(10);

    if (productsError) {
      console.error('Error fetching products:', productsError);
      throw productsError;
    }

    console.log('Found products:', products?.length);

    // Use Gemini to analyze and provide insights
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Analyze these grocery prices and provide shopping insights for "${searchQuery}":

${JSON.stringify(products, null, 2)}

Provide:
1. Best deals and why
2. Price trends analysis
3. Platform recommendations
4. Money-saving tips
5. Average price comparison

Keep the response concise and actionable (max 300 words).`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          }
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', geminiResponse.status, errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    console.log('Gemini response received');
    
    const aiInsights = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 
                       'Unable to generate insights at this time.';

    // Store comparison in history
    await supabase
      .from('comparison_history')
      .insert({
        search_query: searchQuery,
        ai_analysis: {
          insights: aiInsights,
          products_analyzed: products?.length || 0,
          timestamp: new Date().toISOString()
        }
      });

    return new Response(
      JSON.stringify({
        products: products || [],
        aiInsights,
        searchQuery
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in compare-prices function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
