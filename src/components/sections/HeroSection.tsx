import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export const HeroSection = () => {
  const handleExploreCollection = () => {
    const element = document.querySelector("#collections");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewLookbook = () => {
    toast({
      title: "Lookbook",
      description: "Our digital lookbook is coming soon!",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-luxury">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-gold/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-rose-gold/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left z-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/20 mb-8"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-sm font-body tracking-wider uppercase text-gold">New Collection 2024</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6"
            >
              Where <span className="text-gradient-gold italic">Elegance</span>
              <br />
              Meets Eternity
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 font-body font-light leading-relaxed"
            >
              Discover handcrafted jewelry pieces that capture light, emotion, and the essence 
              of timeless beauty. Each creation is a masterpiece waiting to tell your story.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={handleExploreCollection}
                className="bg-gradient-gold text-primary-foreground hover:opacity-90 font-body uppercase tracking-wider px-8 py-6 text-sm group shadow-gold"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleViewLookbook}
                className="border-foreground/20 hover:bg-foreground/5 font-body uppercase tracking-wider px-8 py-6 text-sm"
              >
                View Lookbook
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 mt-12 pt-8 border-t border-border/50"
            >
              {[
                { value: "35+", label: "Years of Excellence" },
                { value: "10K+", label: "Happy Customers" },
                { value: "500+", label: "Unique Designs" },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="font-display text-3xl lg:text-4xl text-gradient-gold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider font-body mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative z-10"
          >
            <div className="relative aspect-[4/5] max-w-lg mx-auto">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-elevated">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
                  alt="Elegant diamond necklace"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent" />
              </div>
              
              {/* Floating accent card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-4 lg:-right-8 top-1/4 glass-effect rounded-2xl p-4 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-display text-sm">Premium Quality</div>
                    <div className="text-xs text-muted-foreground">Certified Diamonds</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Bottom floating card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute -bottom-6 -left-4 lg:-left-8 glass-effect rounded-2xl p-4 shadow-soft cursor-pointer"
                onClick={handleExploreCollection}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Featured</div>
                <div className="font-display text-lg">Celestial Collection</div>
                <div className="text-gold font-body text-sm mt-1">From $2,500</div>
              </motion.div>
              
              {/* Decorative ring */}
              <div className="absolute -z-10 inset-0 -m-4 rounded-3xl border border-gold/20 animate-pulse-gold" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
