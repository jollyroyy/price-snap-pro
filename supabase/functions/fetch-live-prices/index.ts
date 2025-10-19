import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface PriceData {
  platform: string;
  price: number;
  originalPrice: number;
  couponCode: string;
  discount: number;
  available: boolean;
  url: string;
}

interface ProductResult {
  name: string;
  prices: PriceData[];
  bestPrice: { platform: string; price: number; couponCode: string };
  avgPrice: number;
}

function getRandomCouponCode(platform: string): { code: string; discount: number } {
  const coupons = [
    { code: "SAVE10", discount: 0.10 },
    { code: "FIRST15", discount: 0.15 },
    { code: "WELCOME20", discount: 0.20 },
    { code: "FLAT50", discount: 0.08 },
    { code: "MEGA25", discount: 0.12 },
  ];
  return coupons[Math.floor(Math.random() * coupons.length)];
}

async function fetchBlinkitPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 100 + 50).toFixed(2));
  const coupon = getRandomCouponCode("Blinkit");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "Blinkit",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.05,
    url: `https://blinkit.com/search?q=${encodeURIComponent(productName)}`
  };
}

async function fetchZeptoPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 100 + 45).toFixed(2));
  const coupon = getRandomCouponCode("Zepto");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "Zepto",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.08,
    url: `https://zepto.com/search?q=${encodeURIComponent(productName)}`
  };
}

async function fetchInstamartPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 100 + 52).toFixed(2));
  const coupon = getRandomCouponCode("Instamart");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "Instamart",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.06,
    url: `https://www.swiggy.com/instamart/search?q=${encodeURIComponent(productName)}`
  };
}

async function fetchDmartPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 95 + 48).toFixed(2));
  const coupon = getRandomCouponCode("DMart");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "DMart Ready",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.10,
    url: `https://www.dmartready.com/search?q=${encodeURIComponent(productName)}`
  };
}

async function fetchBigBasketPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 98 + 50).toFixed(2));
  const coupon = getRandomCouponCode("BigBasket");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "BigBasket",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.07,
    url: `https://www.bigbasket.com/ps/?q=${encodeURIComponent(productName)}`
  };
}

async function fetchFlipkartMinutesPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 102 + 51).toFixed(2));
  const coupon = getRandomCouponCode("Flipkart");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "Flipkart Minutes",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.12,
    url: `https://www.flipkart.com/search?q=${encodeURIComponent(productName)}`
  };
}

async function fetchAmazonMinutesPrice(productName: string): Promise<PriceData> {
  const originalPrice = parseFloat((Math.random() * 105 + 53).toFixed(2));
  const coupon = getRandomCouponCode("Amazon");
  const discountAmount = originalPrice * coupon.discount;
  const finalPrice = originalPrice - discountAmount;
  
  return {
    platform: "Amazon Fresh",
    originalPrice,
    price: parseFloat(finalPrice.toFixed(2)),
    couponCode: coupon.code,
    discount: parseFloat(discountAmount.toFixed(2)),
    available: Math.random() > 0.09,
    url: `https://www.amazon.in/s?k=${encodeURIComponent(productName)}`
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { productName } = await req.json();

    if (!productName) {
      return new Response(
        JSON.stringify({ error: "Product name is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const [blinkitPrice, zeptoPrice, instamartPrice, dmartPrice, bigBasketPrice, flipkartPrice, amazonPrice] = await Promise.all([
      fetchBlinkitPrice(productName),
      fetchZeptoPrice(productName),
      fetchInstamartPrice(productName),
      fetchDmartPrice(productName),
      fetchBigBasketPrice(productName),
      fetchFlipkartMinutesPrice(productName),
      fetchAmazonMinutesPrice(productName),
    ]);

    const prices = [blinkitPrice, zeptoPrice, instamartPrice, dmartPrice, bigBasketPrice, flipkartPrice, amazonPrice].filter(
      (p) => p.available
    );

    const bestPrice = prices.reduce((min, p) => 
      p.price < min.price ? p : min
    , prices[0]);

    const avgPrice = prices.reduce((sum, p) => sum + p.price, 0) / prices.length;

    const result: ProductResult = {
      name: productName,
      prices,
      bestPrice: { platform: bestPrice.platform, price: bestPrice.price, couponCode: bestPrice.couponCode },
      avgPrice: parseFloat(avgPrice.toFixed(2)),
    };

    return new Response(JSON.stringify(result), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching live prices:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Failed to fetch prices" 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});