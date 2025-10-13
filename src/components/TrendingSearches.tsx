import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const trending = [
  "Milk",
  "Bread",
  "Eggs",
  "Rice",
  "Tomatoes",
  "Onions",
  "Chicken",
  "Paneer",
  "Bananas",
  "Tea",
];

const TrendingSearches = () => {
  return (
    <section className="py-12 px-4 bg-secondary/30">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold">Trending Searches</h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {trending.map((item) => (
            <Badge
              key={item}
              variant="secondary"
              className="text-base py-2 px-4 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
            >
              {item}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingSearches;
