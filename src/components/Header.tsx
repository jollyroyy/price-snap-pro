import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              PriceSnap
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search groceries..."
                className="pl-10 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
              />
            </div>
          </div>

          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary transition-smooth">
            <User className="h-5 w-5 text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
