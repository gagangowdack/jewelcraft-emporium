import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Eye, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  {
    id: 1,
    name: "Celestial Diamond Ring",
    category: "Rings",
    price: 4500,
    originalPrice: 5200,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    badge: "Best Seller",
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Aurora Pearl Necklace",
    category: "Necklaces",
    price: 2800,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    badge: "New",
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Moonlight Sapphire Earrings",
    category: "Earrings",
    price: 3200,
    rating: 5.0,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    badge: null,
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Eternal Love Bracelet",
    category: "Bracelets",
    price: 1950,
    originalPrice: 2400,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&q=80",
    badge: "20% Off",
    isNew: false,
    isSale: true,
  },
  {
    id: 5,
    name: "Starlight Diamond Pendant",
    category: "Necklaces",
    price: 5800,
    rating: 4.9,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=600&q=80",
    badge: "Exclusive",
    isNew: false,
    isSale: false,
  },
  {
    id: 6,
    name: "Royal Emerald Ring",
    category: "Rings",
    price: 7200,
    rating: 4.8,
    reviews: 43,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&q=80",
    badge: "New",
    isNew: true,
    isSale: false,
  },
];

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-muted shadow-soft hover-lift">
        {/* Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badge */}
        {product.badge && (
          <Badge 
            className={`absolute top-4 left-4 ${
              product.isNew 
                ? "bg-gold text-charcoal" 
                : product.isSale 
                  ? "bg-rose-gold text-charcoal" 
                  : "bg-charcoal/80 text-cream"
            } font-body text-xs uppercase tracking-wider`}
          >
            {product.badge}
          </Badge>
        )}
        
        {/* Wishlist Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsLiked(!isLiked)}
          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isLiked 
              ? "bg-rose-gold text-charcoal" 
              : "bg-background/80 backdrop-blur-sm hover:bg-background"
          }`}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
        </motion.button>
        
        {/* Quick Actions */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4 flex gap-2"
            >
              <Button
                size="sm"
                className="flex-1 bg-gold text-charcoal hover:bg-gold-light font-body text-xs uppercase tracking-wider"
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="bg-background/80 backdrop-blur-sm border-0 hover:bg-background"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Product Info */}
      <div className="mt-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider font-body">{product.category}</p>
        <h3 className="font-display text-lg group-hover:text-gold transition-colors">{product.name}</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm font-body">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-display text-xl text-gold">${product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const FeaturedProducts = () => {
  return (
    <section className="py-24 lg:py-32 bg-background" id="new-arrivals">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm font-body uppercase tracking-widest mb-6">
            Curated Selection
          </span>
          <h2 className="font-display text-4xl lg:text-6xl mb-4">
            Featured <span className="text-gradient-gold">Pieces</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body text-lg">
            Discover our most coveted designs, each one a testament to exceptional artistry and timeless elegance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-gold/30 text-gold hover:bg-gold/10 font-body uppercase tracking-wider px-12"
          >
            View All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
