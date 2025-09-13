import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface AnimatedArtisanCardProps {
  name: string;
  craft: string;
  location: string;
  rating: number;
  image: string;
  story: string;
  specialty: string;
  index: number;
}

const AnimatedArtisanCard = ({ 
  name, 
  craft, 
  location, 
  rating, 
  image, 
  story, 
  specialty,
  index 
}: AnimatedArtisanCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  // Generate ID from name for routing
  const artisanId = name.toLowerCase().replace(/\s+/g, '-');

  const handleShopClick = () => {
    navigate("/auth");
  };

  useEffect(() => {
    if (cardRef.current) {
      // GSAP hover animations
      const card = cardRef.current;
      const image = imageRef.current;
      
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -10,
          rotationY: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        if (image) {
          gsap.to(image, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -15
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        delay: index * 0.1
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: index * 0.1 + 0.3
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card 
        ref={cardRef}
        className="group overflow-hidden bg-card border-border shadow-soft hover:shadow-purple transition-all duration-300 cursor-pointer"
      >
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            ref={imageRef}
            src={image} 
            alt={`${name}'s ${craft}`}
            className="w-full h-full object-cover transition-transform duration-300"
          />
          
          <motion.div 
            className="absolute top-3 left-3"
            variants={badgeVariants}
          >
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              {specialty}
            </Badge>
          </motion.div>
          
          <motion.div 
            className="absolute top-3 right-3 flex items-center space-x-1 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-3 h-3 text-amethyst fill-current" />
            </motion.div>
            <span className="text-xs font-medium">{rating}</span>
          </motion.div>

          {/* Animated overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-royal opacity-0"
            whileHover={{ opacity: 0.1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="p-6">
          <motion.div 
            className="flex items-start justify-between mb-3"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
          >
            <div>
              <h3 className="font-semibold text-lg text-foreground mb-1">{name}</h3>
              <p className="text-primary font-medium">{craft}</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center text-muted-foreground text-sm mb-4"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </motion.div>
          
          <motion.p 
            className="text-muted-foreground text-sm mb-4 line-clamp-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.6 }}
          >
            {story}
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-between"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 mr-2"
            >
              <Link to={`/story/${artisanId}`}>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  View Story
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button 
                variant="heritage" 
                size="sm" 
                className="w-full"
                onClick={handleShopClick}
              >
                Shop Crafts
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AnimatedArtisanCard;