import Header from "@/components/Header";
import HeroSearch from "@/components/HeroSearch";
import PriceCard from "@/components/PriceCard";
import ComparisonTable from "@/components/ComparisonTable";
import DealsCarousel from "@/components/DealsCarousel";
import TrendingSearches from "@/components/TrendingSearches";

const sampleProducts = [
  {
    name: "Amul Taaza Toned Milk",
    image: "🥛",
    quantity: "1 Litre",
    prices: [
      { platform: "Blinkit", price: 62, available: true, trend: "up" as const, deliveryTime: "8 min" },
      { platform: "Zepto", price: 60, available: true, trend: "down" as const, deliveryTime: "10 min" },
      { platform: "Instamart", price: 58, available: true, trend: "down" as const, deliveryTime: "15 min" },
    ],
    lowestPlatform: "Instamart",
  },
  {
    name: "White Bread",
    image: "🍞",
    quantity: "400g Pack",
    prices: [
      { platform: "Blinkit", price: 35, available: true, deliveryTime: "8 min" },
      { platform: "Zepto", price: 32, available: true, trend: "down" as const, deliveryTime: "10 min" },
      { platform: "Instamart", price: 34, available: true, deliveryTime: "15 min" },
    ],
    lowestPlatform: "Zepto",
  },
  {
    name: "Fresh Tomatoes",
    image: "🍅",
    quantity: "500g",
    prices: [
      { platform: "Blinkit", price: 45, available: true, trend: "up" as const, deliveryTime: "8 min" },
      { platform: "Zepto", price: 42, available: true, deliveryTime: "10 min" },
      { platform: "Instamart", price: 40, available: true, trend: "down" as const, deliveryTime: "15 min" },
    ],
    lowestPlatform: "Instamart",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSearch />

      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Compare Prices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProducts.map((product) => (
              <PriceCard key={product.name} {...product} />
            ))}
          </div>
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
          <p className="text-sm">Compare prices • Save money • Shop smart</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
