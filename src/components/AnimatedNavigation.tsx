import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Sparkles, Heart, Users } from "lucide-react";

const AnimatedNavigation = () => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current && logoRef.current) {
      // GSAP scroll animation for navbar
      let lastScrollY = window.scrollY;

      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down - hide navbar
          gsap.to(navRef.current, {
            y: -100,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          // Scrolling up - show navbar
          gsap.to(navRef.current, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
        
        lastScrollY = currentScrollY;
      };

      // Logo floating animation
      gsap.to(logoRef.current, {
        y: -2,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "power2.inOut"
      });

      window.addEventListener('scroll', handleScroll, { passive: true });

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 12
      }
    }
  };

  return (
    <motion.nav 
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border"
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div 
          className="flex items-center space-x-2"
          variants={itemVariants}
        >
          <motion.div 
            ref={logoRef}
            className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center"
            whileHover={{ 
              scale: 1.1,
              rotate: 360 
            }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </motion.div>
          <motion.h1 
            className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Kala Setu
          </motion.h1>
        </motion.div>
        
        <motion.div 
          className="hidden md:flex items-center space-x-8"
          variants={itemVariants}
        >
          {["Discover", "Artisans", "Stories", "AI Tools"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-foreground hover:text-primary transition-colors relative"
              whileHover={{ scale: 1.05 }}
              custom={index}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-3"
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              Support Artisans
            </Button>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="heritage" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Join as Artisan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default AnimatedNavigation;