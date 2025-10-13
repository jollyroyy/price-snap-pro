import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame } from "lucide-react";

const deals = [
  {
    emoji: "🥑",
    name: "Fresh Avocado",
    discount: "30% OFF",
    platform: "Zepto",
    originalPrice: 120,
    salePrice: 84,
  },
  {
    emoji: "🍫",
    name: "Dairy Milk Silk",
    discount: "25% OFF",
    platform: "Blinkit",
    originalPrice: 150,
    salePrice: 112,
  },
  {
    emoji: "🍎",
    name: "Organic Apples",
    discount: "20% OFF",
    platform: "Instamart",
    originalPrice: 180,
    salePrice: 144,
  },
  {
    emoji: "🧃",
    name: "Real Juice Pack",
    discount: "15% OFF",
    platform: "Zepto",
    originalPrice: 200,
    salePrice: 170,
  },
];

const DealsCarousel = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="container mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Flame className="h-6 w-6 text-destructive" />
          <h2 className="text-3xl font-bold">Today's Best Deals</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <Card key={deal.name} className="overflow-hidden hover-lift shadow-card group cursor-pointer">
              <div className="p-4">
                <div className="relative mb-4">
                  <div className="w-full aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                    <span className="text-7xl transform group-hover:scale-110 transition-transform duration-300">
                      {deal.emoji}
                    </span>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
                    {deal.discount}
                  </Badge>
                </div>

                <h3 className="font-semibold text-lg mb-2">{deal.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">on {deal.platform}</p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary">₹{deal.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{deal.originalPrice}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsCarousel;
