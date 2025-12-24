import { motion } from "framer-motion";
import { Award, Gem, Shield, Heart } from "lucide-react";

const features = [
  {
    icon: Gem,
    title: "Ethically Sourced",
    description: "Every gemstone is carefully selected from certified conflict-free sources.",
  },
  {
    icon: Award,
    title: "Master Craftsmanship",
    description: "Each piece is handcrafted by artisans with decades of experience.",
  },
  {
    icon: Shield,
    title: "Lifetime Warranty",
    description: "We stand behind our quality with comprehensive lifetime coverage.",
  },
  {
    icon: Heart,
    title: "Personal Touch",
    description: "Custom engraving and bespoke designs available for every piece.",
  },
];

export const AboutSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-luxury overflow-hidden" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated"
              >
                <img
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80"
                  alt="Jewelry craftsmanship"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1609042890272-1e62e9f9ea8e?w=600&q=80"
                  alt="Diamond selection"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute -bottom-8 -right-4 lg:-right-8 glass-effect rounded-2xl p-6 shadow-elevated"
            >
              <div className="text-center">
                <div className="font-display text-4xl text-gradient-gold mb-1">1987</div>
                <div className="text-sm text-muted-foreground font-body">Est. New York</div>
              </div>
            </motion.div>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-1/4 -left-12 w-48 h-48 bg-gold/10 rounded-full blur-3xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-body uppercase tracking-widest mb-6">
              Our Legacy
            </span>
            <h2 className="font-display text-4xl lg:text-5xl mb-6 leading-tight">
              Three Generations of
              <span className="text-gradient-gold block">Exceptional Artistry</span>
            </h2>
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-8">
              For over three decades, Lumière has been synonymous with uncompromising quality 
              and timeless design. What began as a small atelier on Fifth Avenue has grown 
              into an internationally recognized name in fine jewelry, yet we've never lost 
              sight of what made us special—the personal touch.
            </p>
            <p className="text-muted-foreground text-lg font-body leading-relaxed mb-10">
              Every piece that bears the Lumière name is a testament to our commitment to 
              excellence. From the initial design sketch to the final polish, our master 
              artisans pour their passion into creating jewelry that will be treasured 
              for generations.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="group"
                >
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-3 group-hover:bg-gold/20 transition-colors">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h4 className="font-display text-lg mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground font-body">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
