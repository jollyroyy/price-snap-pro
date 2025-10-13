import { useState } from "react";
import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import PriceCard from "@/components/PriceCard";
import ComparisonTable from "@/components/ComparisonTable";
import DealsCarousel from "@/components/DealsCarousel";
import TrendingSearches from "@/components/TrendingSearches";
import AIInsights from "@/components/AIInsights";
import { useProducts, useComparePrice, Product } from "@/hooks/useProducts";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const Index = () => {
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [aiInsights, setAiInsights] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);
  
  const { data: allProducts, isLoading } = useProducts();
  const { comparePrice } = useComparePrice();
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchQuery(query);
    
    try {
      const result = await comparePrice(query);
      setSearchResults(result.products);
      setAiInsights(result.aiInsights);
      
      if (result.products.length === 0) {
        toast({
          title: "No products found",
          description: `No products matching "${query}" were found.`,
        });
      } else {
        toast({
          title: "Analysis complete",
          description: `Found ${result.products.length} products with AI insights`,
        });
      }
    } catch (error) {
      console.error("Search error:", error);
      toast({
        title: "Search failed",
        description: "Unable to search products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const getLowestPlatform = (priceData: any[]) => {
    if (!priceData || priceData.length === 0) return "";
    const lowest = priceData.reduce((min, p) => 
      p.price < min.price ? p : min, priceData[0]
    );
    return lowest.platform;
  };

  const displayProducts = searchResults.length > 0 ? searchResults : (allProducts || []).slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSearch onSearch={handleSearch} isSearching={isSearching} />

      {aiInsights && (
        <section className="py-8 px-4 bg-secondary/30">
          <div className="container mx-auto max-w-4xl">
            <AIInsights insights={aiInsights} searchQuery={searchQuery} />
          </div>
        </section>
      )}

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            {searchResults.length > 0 ? `Search Results (${searchResults.length})` : "Featured Products"}
          </h2>
          
          {isLoading || isSearching ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-muted-foreground">
                {isSearching ? "Analyzing prices with AI..." : "Loading products..."}
              </span>
            </div>
          ) : displayProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map((product) => (
                <PriceCard
                  key={product.id}
                  name={product.name}
                  image={product.image_emoji || "📦"}
                  quantity={product.quantity || ""}
                  prices={product.price_data}
                  lowestPlatform={getLowestPlatform(product.price_data)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found. Try a different search.</p>
            </div>
          )}
        </div>
      </section>

      <ComparisonTable />
      <DealsCarousel />
      <TrendingSearches />

      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p className="mb-2">
            <span className="text-2xl mr-2">🛒</span>
            <span className="font-bold text-foreground">PriceSnap</span> - Smart Grocery Compare
          </p>
          <p className="text-sm">Compare prices • Save money • Shop smart • Powered by AI</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
