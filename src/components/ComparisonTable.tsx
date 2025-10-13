import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Product {
  name: string;
  blinkit: number;
  zepto: number;
  instamart: number;
}

const products: Product[] = [
  { name: "Amul Milk 1L", blinkit: 62, zepto: 60, instamart: 58 },
  { name: "Bread - White", blinkit: 35, zepto: 32, instamart: 34 },
  { name: "Tomatoes 500g", blinkit: 45, zepto: 42, instamart: 40 },
  { name: "Rice 1kg", blinkit: 85, zepto: 88, instamart: 82 },
];

const ComparisonTable = () => {
  const totals = {
    blinkit: products.reduce((sum, p) => sum + p.blinkit, 0),
    zepto: products.reduce((sum, p) => sum + p.zepto, 0),
    instamart: products.reduce((sum, p) => sum + p.instamart, 0),
  };

  const lowest = Math.min(totals.blinkit, totals.zepto, totals.instamart);
  const savings = Math.max(totals.blinkit, totals.zepto, totals.instamart) - lowest;

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
                  <th className="p-4 text-center font-semibold">
                    <div className="flex flex-col items-center gap-1">
                      <span>Blinkit</span>
                      <div className="w-3 h-3 rounded-full bg-blinkit"></div>
                    </div>
                  </th>
                  <th className="p-4 text-center font-semibold">
                    <div className="flex flex-col items-center gap-1">
                      <span>Zepto</span>
                      <div className="w-3 h-3 rounded-full bg-zepto"></div>
                    </div>
                  </th>
                  <th className="p-4 text-center font-semibold">
                    <div className="flex flex-col items-center gap-1">
                      <span>Instamart</span>
                      <div className="w-3 h-3 rounded-full bg-instamart"></div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.name} className={index % 2 === 0 ? "bg-background" : "bg-secondary/30"}>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-center">₹{product.blinkit}</td>
                    <td className="p-4 text-center">₹{product.zepto}</td>
                    <td className="p-4 text-center">₹{product.instamart}</td>
                  </tr>
                ))}
                <tr className="bg-primary/10 font-bold">
                  <td className="p-4">Total</td>
                  <td className="p-4 text-center">₹{totals.blinkit}</td>
                  <td className="p-4 text-center">₹{totals.zepto}</td>
                  <td className="p-4 text-center">₹{totals.instamart}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-t">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">You can save up to</p>
                <p className="text-3xl font-bold text-accent">₹{savings}</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Shop on Blinkit</Button>
                <Button variant="outline">Shop on Zepto</Button>
                <Button className="bg-accent hover:bg-accent/90">Shop on Instamart</Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ComparisonTable;
