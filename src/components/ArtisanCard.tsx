import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Eye } from "lucide-react";

interface ArtisanCardProps {
  name: string;
  craft: string;
  location: string;
  rating: number;
  image: string;
  story: string;
  specialty: string;
}

const ArtisanCard = ({ name, craft, location, rating, image, story, specialty }: ArtisanCardProps) => {
  return (
    <Card className="group overflow-hidden bg-card border-border shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={image} 
          alt={`${name}'s ${craft}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
            {specialty}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <Star className="w-3 h-3 text-gold fill-current" />
          <span className="text-xs font-medium">{rating}</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
            <p className="text-primary font-medium">{craft}</p>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          {location}
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {story}
        </p>
        
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" className="flex-1 mr-2">
            <Eye className="w-4 h-4 mr-2" />
            View Story
          </Button>
          <Button variant="heritage" size="sm" className="flex-1">
            Shop Crafts
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ArtisanCard;