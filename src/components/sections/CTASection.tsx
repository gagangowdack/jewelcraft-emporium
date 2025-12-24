import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?w=1920&q=80"
          alt="Luxury jewelry background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/80" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-gold/10 rounded-full blur-3xl" />
        
        {/* Sparkle particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
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
          >
            <Sparkles className="w-4 h-4 text-gold/40" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-sm font-body uppercase tracking-widest mb-8">
              <Sparkles className="w-4 h-4" />
              Exclusive Offer
            </span>
            
            <h2 className="font-display text-4xl lg:text-6xl text-cream mb-6 leading-tight">
              Begin Your Journey to
              <span className="text-gradient-gold block mt-2">Timeless Elegance</span>
            </h2>
            
            <p className="text-cream/70 text-lg lg:text-xl font-body mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our exclusive circle and receive 15% off your first purchase, 
              plus early access to new collections and private events.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-gold text-charcoal hover:opacity-90 font-body uppercase tracking-wider px-10 py-6 text-sm group shadow-gold"
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-cream/30 text-cream hover:bg-cream/10 font-body uppercase tracking-wider px-10 py-6 text-sm"
              >
                Book Consultation
              </Button>
            </div>
            
            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-8 mt-12 pt-8 border-t border-cream/10"
            >
              {[
                "Free Shipping Worldwide",
                "30-Day Returns",
                "Lifetime Warranty",
              ].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-cream/50 text-sm font-body"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="hidden sm:inline">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
