import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Users } from "lucide-react";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Kala Setu
          </h1>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#discover" className="text-foreground hover:text-primary transition-colors">
            Discover
          </a>
          <a href="#artisans" className="text-foreground hover:text-primary transition-colors">
            Artisans
          </a>
          <a href="#stories" className="text-foreground hover:text-primary transition-colors">
            Stories
          </a>
          <a href="#ai-tools" className="text-foreground hover:text-primary transition-colors">
            AI Tools
          </a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Heart className="w-4 h-4 mr-2" />
            Support Artisans
          </Button>
          <Button variant="heritage" size="sm">
            <Users className="w-4 h-4 mr-2" />
            Join as Artisan
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;