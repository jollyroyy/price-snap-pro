import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

interface PriceData {
  platform: string;
  price: number;
  available: boolean;
  trend?: "up" | "down";
  deliveryTime?: string;
}

interface PriceCardProps {
  name: string;
  image: string;
  quantity: string;
  prices: PriceData[];
  lowestPlatform: string;
}

const platformColors: Record<string, string> = {
  Blinkit: "blinkit",
  Zepto: "zepto",
  Instamart: "instamart",
};

const PriceCard = ({ name, image, quantity, prices, lowestPlatform }: PriceCardProps) => {
  return (
    <Card className="overflow-hidden hover-lift shadow-card">
      <div className="p-4">
        <div className="flex gap-4 mb-4">
          <div className="w-20 h-20 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
            <span className="text-4xl">{image}</span>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-1">{name}</h3>
            <p className="text-sm text-muted-foreground">{quantity}</p>
          </div>
        </div>

        <div className="space-y-3">
          {prices.map((price) => (
            <div
              key={price.platform}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 border border-border"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{price.platform}</span>
                {price.deliveryTime && (
                  <span className="text-xs text-muted-foreground">• {price.deliveryTime}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {price.trend && (
                  price.trend === "down" ? (
                    <TrendingDown className="h-4 w-4 text-accent" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-destructive" />
                  )
                )}
                <span className="font-bold text-lg">₹{price.price}</span>
                {price.platform === lowestPlatform && (
                  <Badge className="bg-accent text-accent-foreground">Lowest</Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
          Add to Compare
        </Button>
      </div>
    </Card>
  );
};

export default PriceCard;
