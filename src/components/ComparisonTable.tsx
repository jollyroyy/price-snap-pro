import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useFetchLivePrice } from "@/hooks/useProducts";

interface Product {
  name: string;
  blinkit: number;
  zepto: number;
  instamart: number;
}

const sampleProducts = ["Milk 1L", "Bread", "Tomatoes 500g", "Rice 1kg"];

const ComparisonTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { fetchLivePrice } = useFetchLivePrice();

  useEffect(() => {
    const fetchAllPrices = async () => {
      setLoading(true);
      const results = await Promise.all(
        sampleProducts.map(async (productName) => {
          try {
            const data = await fetchLivePrice(productName);
            const blinkitPrice = data.prices.find((p: any) => p.platform === "Blinkit")?.price || 0;
            const zeptoPrice = data.prices.find((p: any) => p.platform === "Zepto")?.price || 0;
            const instamartPrice = data.prices.find((p: any) => p.platform === "Instamart")?.price || 0;
            return {
              name: productName,
              blinkit: blinkitPrice,
              zepto: zeptoPrice,
              instamart: instamartPrice,
            };
          } catch {
            return {
              name: productName,
              blinkit: 0,
              zepto: 0,
              instamart: 0,
            };
          }
        })
      );
      setProducts(results);
      setLoading(false);
    };
    fetchAllPrices();
  }, []);

  const totals = {
    blinkit: products.reduce((sum, p) => sum + p.blinkit, 0),
    zepto: products.reduce((sum, p) => sum + p.zepto, 0),
    instamart: products.reduce((sum, p) => sum + p.instamart, 0),
  };

  const lowest = Math.min(totals.blinkit, totals.zepto, totals.instamart);
  const highest = Math.max(totals.blinkit, totals.zepto, totals.instamart);
  const savings = highest - lowest;

  const bestPlatform = totals.blinkit === lowest ? "Blinkit" : totals.zepto === lowest ? "Zepto" : "Instamart";

  return (
    <section className="py-12 px-4 bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Price Comparison</h2>
          <p className="text-muted-foreground">Compare your shopping cart across platforms</p>
        </div>

        <Card className="overflow-hidden shadow-lifted">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="p-4 text-left font-semibold">Product</th>
                  <th className="p-4 text-center font-semibold text-sm">
                    <div className="flex flex-col items-center gap-1">
                      <span>Blinkit</span>
                      <div className="w-3 h-3 rounded-full bg-blinkit"></div>
                    </div>
                  </th>
                  <th className="p-4 text-center font-semibold text-sm">
                    <div className="flex flex-col items-center gap-1">
                      <span>Zepto</span>
                      <div className="w-3 h-3 rounded-full bg-zepto"></div>
                    </div>
                  </th>
                  <th className="p-4 text-center font-semibold text-sm">
                    <div className="flex flex-col items-center gap-1">
                      <span>Instamart</span>
                      <div className="w-3 h-3 rounded-full bg-instamart"></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted-foreground">
                      Fetching live prices...
                    </td>
                  </tr>
                ) : (
                  <>
                    {products.map((product, index) => (
                      <tr key={product.name} className={index % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4 text-center text-sm">₹{product.blinkit.toFixed(2)}</td>
                        <td className="p-4 text-center text-sm">₹{product.zepto.toFixed(2)}</td>
                        <td className="p-4 text-center text-sm">₹{product.instamart.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-primary/10 font-bold">
                      <td className="p-4">Total</td>
                      <td className="p-4 text-center text-sm">₹{totals.blinkit.toFixed(2)}</td>
                      <td className="p-4 text-center text-sm">₹{totals.zepto.toFixed(2)}</td>
                      <td className="p-4 text-center text-sm">₹{totals.instamart.toFixed(2)}</td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">You save by choosing {bestPlatform}</p>
                <p className="text-3xl font-bold text-accent">₹{savings.toFixed(2)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant={bestPlatform === "Blinkit" ? "default" : "outline"} size="sm">Blinkit</Button>
                <Button variant={bestPlatform === "Zepto" ? "default" : "outline"} size="sm">Zepto</Button>
                <Button variant={bestPlatform === "Instamart" ? "default" : "outline"} size="sm">Instamart</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonTable;
