import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface AIInsightsProps {
  insights: string;
  searchQuery: string;
}

const AIInsights = ({ insights, searchQuery }: AIInsightsProps) => {
  return (
    <Card className="p-6 shadow-lifted bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">AI Shopping Insights</h3>
          <p className="text-sm text-muted-foreground">
            Analysis for "{searchQuery}"
          </p>
        </div>
      </div>
      
      <div className="prose prose-sm max-w-none">
        <p className="text-foreground whitespace-pre-line leading-relaxed">
          {insights}
        </p>
      </div>
    </Card>
  );
};

export default AIInsights;
