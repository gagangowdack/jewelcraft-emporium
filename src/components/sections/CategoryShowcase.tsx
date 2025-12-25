import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: "rings",
    name: "Rings",
    count: 156,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    description: "Engagement, wedding & statement rings",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    count: 98,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    description: "Pendants, chains & layered pieces",
  },
  {
    id: "earrings",
    name: "Earrings",
    count: 134,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    description: "Studs, drops & statement earrings",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    count: 87,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    description: "Tennis, cuffs & charm bracelets",
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-24 lg:py-32 bg-charcoal" id="rings">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-body uppercase tracking-widest mb-6">
            Shop by Category
          </span>
          <h2 className="font-display text-4xl lg:text-6xl text-cream mb-4">
            Find Your <span className="text-gradient-gold">Perfect Piece</span>
          </h2>
          <p className="text-cream/60 max-w-2xl mx-auto font-body text-lg">
            Browse our carefully curated categories to discover jewelry that speaks to your style.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                to={`/category/${category.id}`}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer block"
              >
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-5 lg:p-6 flex flex-col justify-end">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-2xl lg:text-3xl text-cream mb-1">
                        {category.name}
                      </h3>
                      <p className="text-cream/60 text-sm font-body hidden lg:block">
                        {category.description}
                      </p>
                      <p className="text-gold text-sm font-body mt-2">
                        {category.count} pieces
                      </p>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <ArrowUpRight className="w-5 h-5 text-gold" />
                    </motion.div>
                  </div>
                </div>
                
                {/* Hover Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
