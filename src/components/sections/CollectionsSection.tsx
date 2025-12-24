import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    id: 1,
    name: "Celestial",
    description: "Inspired by the stars",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    itemCount: 42,
  },
  {
    id: 2,
    name: "Eternal Love",
    description: "For unforgettable moments",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    itemCount: 38,
  },
  {
    id: 3,
    name: "Ocean Dreams",
    description: "Treasures of the sea",
    image: "https://images.unsplash.com/photo-1610661004099-46a91a6e8b59?w=800&q=80",
    itemCount: 28,
  },
  {
    id: 4,
    name: "Vintage Revival",
    description: "Classic elegance reborn",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
    itemCount: 56,
  },
];

export const CollectionsSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-luxury" id="collections">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-body uppercase tracking-widest mb-6">
            Our Collections
          </span>
          <h2 className="font-display text-4xl lg:text-6xl mb-4">
            Explore <span className="text-gradient-gold">Collections</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg">
            Each collection tells a unique story, crafted with passion and precision to celebrate life's most precious moments.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {collections.map((collection, index) => (
            <motion.a
              key={collection.id}
              href={`#collection-${collection.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={collection.image}
                alt={collection.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-gold text-sm font-body uppercase tracking-widest mb-2">
                      {collection.itemCount} Pieces
                    </p>
                    <h3 className="font-display text-3xl lg:text-4xl text-cream mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-cream/70 font-body text-sm lg:text-base">
                      {collection.description}
                    </p>
                  </div>
                  
                  <motion.div
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    className="w-12 h-12 rounded-full bg-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <ArrowRight className="w-5 h-5 text-charcoal" />
                  </motion.div>
                </div>
              </div>
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 rounded-2xl border-2 border-gold/0 group-hover:border-gold/50 transition-colors duration-300" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
