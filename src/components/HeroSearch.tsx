import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Fruits", emoji: "🍎" },
  { name: "Vegetables", emoji: "🥕" },
  { name: "Dairy", emoji: "🥛" },
  { name: "Snacks", emoji: "🍿" },
  { name: "Beverages", emoji: "🥤" },
];

const HeroSearch = () => {
  return (
    <section className="gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          Find the Best Grocery Prices
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Compare prices across Blinkit, Zepto & Instamart
        </p>

        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search for products..."
            className="h-14 pl-12 pr-4 text-lg bg-background shadow-card border-0 focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant="secondary"
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
