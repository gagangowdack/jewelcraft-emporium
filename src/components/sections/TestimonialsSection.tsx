import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Elizabeth Chen",
    location: "New York, USA",
    rating: 5,
    text: "The Celestial Diamond Ring exceeded all my expectations. The craftsmanship is impeccable, and the way it catches light is absolutely mesmerizing. This is now my most treasured possession.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    product: "Celestial Diamond Ring",
  },
  {
    id: 2,
    name: "Sarah Williams",
    location: "London, UK",
    rating: 5,
    text: "I purchased the Aurora Pearl Necklace for my wedding, and it was the perfect choice. The pearls have this ethereal glow that complemented my dress beautifully. Received so many compliments!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    product: "Aurora Pearl Necklace",
  },
  {
    id: 3,
    name: "Marie Laurent",
    location: "Paris, France",
    rating: 5,
    text: "Lumière's attention to detail is extraordinary. Every piece I've purchased has become an heirloom-quality treasure. Their customer service is equally exceptional—truly a luxury experience from start to finish.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    product: "Moonlight Sapphire Set",
  },
  {
    id: 4,
    name: "Victoria Rose",
    location: "Sydney, Australia",
    rating: 5,
    text: "The engagement ring my fiancé chose from Lumière is breathtaking. The diamond quality is outstanding, and the vintage-inspired design is exactly what I always dreamed of. Forever grateful.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    product: "Vintage Diamond Solitaire",
  },
];

export const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      if (dir === 1) return (prev + 1) % testimonials.length;
      return prev === 0 ? testimonials.length - 1 : prev - 1;
    });
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-body uppercase tracking-widest mb-6">
            Customer Stories
          </span>
          <h2 className="font-display text-4xl lg:text-6xl mb-4">
            Loved by <span className="text-gradient-gold">Thousands</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg">
            Hear from our cherished customers about their Lumière experience.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center z-10">
            <Quote className="w-6 h-6 text-gold" />
          </div>

          {/* Testimonial Card */}
          <div className="relative bg-card rounded-3xl shadow-elevated p-8 lg:p-12 overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative"
              >
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                  {/* Image */}
                  <div className="relative shrink-0">
                    <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-gold/20">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                      <Star className="w-5 h-5 text-charcoal fill-current" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="text-center lg:text-left">
                    {/* Rating */}
                    <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                      ))}
                    </div>

                    {/* Text */}
                    <p className="font-display text-xl lg:text-2xl italic text-foreground/90 mb-6 leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </p>

                    {/* Author */}
                    <div>
                      <p className="font-display text-lg text-foreground">
                        {testimonials[currentIndex].name}
                      </p>
                      <p className="text-sm text-muted-foreground font-body">
                        {testimonials[currentIndex].location}
                      </p>
                      <p className="text-sm text-gold font-body mt-1">
                        Purchased: {testimonials[currentIndex].product}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted hover:border-gold transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-gold w-8"
                      : "bg-border hover:bg-gold/50"
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={() => navigate(1)}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted hover:border-gold transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
