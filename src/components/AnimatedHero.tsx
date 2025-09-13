import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Globe, ArrowRight, Users, Heart, Star } from "lucide-react";
import heroImage from "@/assets/hero-artisan.jpg";

const AnimatedHero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (heroRef.current && imageRef.current) {
      // GSAP animations for the hero image
      gsap.fromTo(
        imageRef.current,
        { 
          scale: 0.8, 
          rotation: -10,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0,
          opacity: 1,
          duration: 1.5,
          ease: "back.out(1.7)",
          delay: 0.5
        }
      );

      // GSAP floating animation for the glow effect
      gsap.to(imageRef.current.querySelector('.glow-effect'), {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12
      }
    }
  };

  const statsVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
        delay: 1.2
      }
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative pt-20 pb-16 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-4">
              <motion.div variants={itemVariants}>
                <Badge className="bg-amethyst/10 text-amethyst-foreground border-amethyst/20">
                  ✨ AI-Powered Heritage Platform
                </Badge>
              </motion.div>
              
              <motion.h1 
                className="text-4xl lg:text-6xl font-bold leading-tight"
                variants={itemVariants}
              >
                Empower Your{" "}
                <span className="bg-gradient-royal bg-clip-text text-transparent">
                  Craft Story
                </span>{" "}
                with AI
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-xl"
                variants={itemVariants}
              >
                Bridge traditional craftsmanship with modern digital marketing. 
                Help local artisans tell their stories, reach global audiences, 
                and preserve cultural heritage.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="heritage" size="lg" className="group shadow-purple">
                  <motion.div
                    animate={{ rotate: [0, 12, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                  </motion.div>
                  Start Your Story
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.div>
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="outline" size="lg">
                  <Globe className="w-5 h-5 mr-2" />
                  Discover Artisans
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex items-center space-x-6 text-sm text-muted-foreground"
              variants={statsVariants}
            >
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
              >
                <Users className="w-4 h-4 mr-1" />
                <span>500+ Artisans</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
              >
                <Heart className="w-4 h-4 mr-1" />
                <span>10k+ Stories</span>
              </motion.div>
              <motion.div 
                className="flex items-center"
                whileHover={{ scale: 1.1 }}
              >
                <Star className="w-4 h-4 mr-1 fill-current text-amethyst" />
                <span>4.8 Rating</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <div className="relative" ref={imageRef}>
            <div className="glow-effect absolute inset-0 bg-gradient-royal rounded-3xl blur-3xl opacity-20 transform"></div>
            <motion.img 
              src={heroImage} 
              alt="Artisan crafting traditional pottery"
              className="relative rounded-3xl shadow-elegant w-full aspect-[4/3] object-cover"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            />
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-purple"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                y: { duration: 2, repeat: Infinity },
                rotate: { duration: 8, repeat: Infinity, ease: "linear" }
              }}
            >
              <Sparkles className="w-8 h-8 text-primary-foreground" />
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center shadow-purple"
              animate={{ 
                x: [0, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              <Heart className="w-6 h-6 text-accent-foreground" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedHero;