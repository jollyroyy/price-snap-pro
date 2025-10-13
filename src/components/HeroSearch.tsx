import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { name: "Fruits", emoji: "🍎" },
  { name: "Vegetables", emoji: "🥕" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Snacks", emoji: "🍿" },
  { name: "Beverages", emoji: "🥤" },
];

interface HeroSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
}

const HeroSearch = ({ onSearch, isSearching }: HeroSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter a search query",
        description: "Please enter a product name to search",
        variant: "destructive",
      });
      return;
    }
    onSearch(searchQuery);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Find the Best Grocery Prices
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Compare prices across Blinkit, Zepto & Instamart with AI-powered insights
        </p>

        <div className="relative max-w-2xl mx-auto mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for products..."
            className="h-14 pl-12 pr-32 text-lg bg-background shadow-card border-0 focus-visible:ring-2 focus-visible:ring-primary"
            disabled={isSearching}
          />
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="absolute right-2 top-1/2 -translate-y-1/2 gradient-primary"
          >
            {isSearching ? (
              <>
                <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Compare
              </>
            )}
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="secondary"
              onClick={() => {
                setSearchQuery(category.name);
                onSearch(category.name);
              }}
              disabled={isSearching}
              className="rounded-full hover:bg-primary hover:text-primary-foreground transition-smooth shadow-soft"
            >
              <span className="mr-2">{category.emoji}</span>
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSearch;
