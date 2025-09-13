import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Wand2, TrendingUp, Target } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AnimatedFeatures = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (sectionRef.current) {
      // GSAP ScrollTrigger animation for cards
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              y: 100,
              opacity: 0,
              rotationY: 45,
            },
            {
              y: 0,
              opacity: 1,
              rotationY: 0,
              duration: 1,
              delay: index * 0.2,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              }
            }
          );
        }
      });

      // Floating animation for icons
      cardsRef.current.forEach((card) => {
        if (card) {
          const icon = card.querySelector('.feature-icon');
          if (icon) {
            gsap.to(icon, {
              y: -10,
              duration: 2,
              yoyo: true,
              repeat: -1,
              ease: "power2.inOut"
            });
          }
        }
      });
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const titleVariants = {
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

  const features = [
    {
      icon: Wand2,
      title: "AI Story Generator",
      description: "Transform your craft into compelling narratives that resonate with customers and preserve cultural heritage.",
      gradient: "bg-gradient-primary"
    },
    {
      icon: TrendingUp,
      title: "Smart Marketing",
      description: "Generate social media content, product descriptions, and marketing strategies tailored to your unique craft.",
      gradient: "bg-gradient-accent"
    },
    {
      icon: Target,
      title: "Audience Insights",
      description: "Understand your customers better with AI-powered analytics and personalized recommendations.",
      gradient: "bg-amethyst/20"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl font-bold mb-4"
            variants={titleVariants}
          >
            Powerful AI Tools for{" "}
            <span className="bg-gradient-royal bg-clip-text text-transparent">
              Artisan Success
            </span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            variants={titleVariants}
          >
            Leverage cutting-edge AI technology to enhance your craft digital presence 
            and connect with customers worldwide.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="group p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-purple transition-all duration-500 hover:-translate-y-2 cursor-pointer"
            >
              <motion.div
                className={`feature-icon w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center mb-4`}
                whileHover={{ 
                  scale: 1.2,
                  rotate: 360
                }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              
              <motion.h3 
                className="text-xl font-semibold mb-3"
                whileHover={{ x: 5 }}
              >
                {feature.title}
              </motion.h3>
              
              <motion.p 
                className="text-muted-foreground"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {feature.description}
              </motion.p>

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-royal opacity-0 rounded-2xl"
                whileHover={{ opacity: 0.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedFeatures;