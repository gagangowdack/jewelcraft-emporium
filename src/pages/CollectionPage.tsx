import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

const collectionProducts: Record<string, {
  name: string;
  description: string;
  image: string;
  subcategories: string[];
  products: Array<{
    id: string;
    name: string;
    price: number;
    image: string;
    subcategory: string;
    rating: number;
  }>;
}> = {
  celestial: {
    name: "Celestial",
    description: "Inspired by the stars and cosmic wonders",
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80",
    subcategories: ["Moon & Stars", "Galaxy", "Constellation", "Sun"],
    products: [
      { id: "cel-1", name: "Crescent Moon Pendant", price: 189, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", subcategory: "Moon & Stars", rating: 4.9 },
      { id: "cel-2", name: "Star Cluster Earrings", price: 145, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", subcategory: "Moon & Stars", rating: 4.8 },
      { id: "cel-3", name: "Galaxy Spiral Ring", price: 275, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", subcategory: "Galaxy", rating: 5.0 },
      { id: "cel-4", name: "Nebula Drop Necklace", price: 320, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", subcategory: "Galaxy", rating: 4.7 },
      { id: "cel-5", name: "Orion Belt Bracelet", price: 195, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80", subcategory: "Constellation", rating: 4.9 },
      { id: "cel-6", name: "North Star Stud", price: 125, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", subcategory: "Constellation", rating: 4.6 },
      { id: "cel-7", name: "Solar Flare Ring", price: 245, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80", subcategory: "Sun", rating: 4.8 },
      { id: "cel-8", name: "Sunrise Pendant", price: 210, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", subcategory: "Sun", rating: 4.7 },
    ],
  },
  "eternal-love": {
    name: "Eternal Love",
    description: "For unforgettable moments and timeless romance",
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    subcategories: ["Hearts", "Infinity", "Promise", "Anniversary"],
    products: [
      { id: "love-1", name: "Double Heart Ring", price: 285, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", subcategory: "Hearts", rating: 5.0 },
      { id: "love-2", name: "Heart Locket Necklace", price: 195, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", subcategory: "Hearts", rating: 4.9 },
      { id: "love-3", name: "Infinity Band", price: 320, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80", subcategory: "Infinity", rating: 4.8 },
      { id: "love-4", name: "Eternal Loop Earrings", price: 165, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", subcategory: "Infinity", rating: 4.7 },
      { id: "love-5", name: "Promise Ring Set", price: 450, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", subcategory: "Promise", rating: 5.0 },
      { id: "love-6", name: "Commitment Bracelet", price: 225, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80", subcategory: "Promise", rating: 4.9 },
      { id: "love-7", name: "Anniversary Diamond Ring", price: 890, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", subcategory: "Anniversary", rating: 5.0 },
      { id: "love-8", name: "Forever Pendant", price: 345, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", subcategory: "Anniversary", rating: 4.8 },
    ],
  },
  "ocean-dreams": {
    name: "Ocean Dreams",
    description: "Treasures of the sea and coastal inspirations",
    image: "https://images.unsplash.com/photo-1610661004099-46a91a6e8b59?w=800&q=80",
    subcategories: ["Pearls", "Shells", "Waves", "Marine Life"],
    products: [
      { id: "ocean-1", name: "Pearl Strand Necklace", price: 425, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", subcategory: "Pearls", rating: 5.0 },
      { id: "ocean-2", name: "Freshwater Pearl Studs", price: 145, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", subcategory: "Pearls", rating: 4.8 },
      { id: "ocean-3", name: "Conch Shell Pendant", price: 175, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", subcategory: "Shells", rating: 4.7 },
      { id: "ocean-4", name: "Cowrie Shell Bracelet", price: 125, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80", subcategory: "Shells", rating: 4.6 },
      { id: "ocean-5", name: "Wave Crest Ring", price: 215, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", subcategory: "Waves", rating: 4.9 },
      { id: "ocean-6", name: "Tidal Hoop Earrings", price: 185, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", subcategory: "Waves", rating: 4.8 },
      { id: "ocean-7", name: "Seahorse Charm", price: 95, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80", subcategory: "Marine Life", rating: 4.5 },
      { id: "ocean-8", name: "Starfish Pendant", price: 165, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", subcategory: "Marine Life", rating: 4.7 },
    ],
  },
  "vintage-revival": {
    name: "Vintage Revival",
    description: "Classic elegance reborn with modern craftsmanship",
    image: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
    subcategories: ["Art Deco", "Victorian", "Retro", "Antique"],
    products: [
      { id: "vin-1", name: "Art Deco Diamond Ring", price: 685, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80", subcategory: "Art Deco", rating: 5.0 },
      { id: "vin-2", name: "Geometric Drop Earrings", price: 245, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80", subcategory: "Art Deco", rating: 4.9 },
      { id: "vin-3", name: "Victorian Cameo Brooch", price: 320, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80", subcategory: "Victorian", rating: 4.8 },
      { id: "vin-4", name: "Filigree Pendant", price: 275, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80", subcategory: "Victorian", rating: 4.7 },
      { id: "vin-5", name: "Retro Cocktail Ring", price: 395, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400&q=80", subcategory: "Retro", rating: 4.9 },
      { id: "vin-6", name: "50s Style Bracelet", price: 225, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80", subcategory: "Retro", rating: 4.6 },
      { id: "vin-7", name: "Antique Pearl Necklace", price: 545, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80", subcategory: "Antique", rating: 5.0 },
      { id: "vin-8", name: "Heritage Signet Ring", price: 365, image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80", subcategory: "Antique", rating: 4.8 },
    ],
  },
};

const CollectionPage = () => {
  const { collection } = useParams<{ collection: string }>();
  const { addToCart, addToWishlist } = useCart();
  
  const collectionData = collection ? collectionProducts[collection] : null;

  if (!collectionData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-display text-foreground mb-4">Collection Not Found</h1>
          <Link to="/" className="text-gold hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = (product: typeof collectionData.products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: collectionData.name,
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (product: typeof collectionData.products[0]) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: collectionData.name,
    });
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <img 
          src={collectionData.image} 
          alt={collectionData.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-6 pb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-gold hover:text-gold/80 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl lg:text-7xl text-foreground mb-2"
            >
              {collectionData.name}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-xl"
            >
              {collectionData.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-3 mb-12">
          {collectionData.subcategories.map((sub) => (
            <span 
              key={sub}
              className="px-4 py-2 rounded-full bg-gold/10 border border-gold/20 text-gold text-sm"
            >
              {sub}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collectionData.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-gold/30 transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-gold text-charcoal hover:bg-gold/90"
                    onClick={() => handleAddToCart(product)}
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    size="icon" 
                    variant="outline"
                    className="border-gold/50 text-gold hover:bg-gold/10"
                    onClick={() => handleAddToWishlist(product)}
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <span className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded text-xs text-muted-foreground">
                  {product.subcategory}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span className="text-sm text-muted-foreground">{product.rating}</span>
                </div>
                <h3 className="font-display text-lg text-foreground mb-1">{product.name}</h3>
                <p className="text-gold font-semibold">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
