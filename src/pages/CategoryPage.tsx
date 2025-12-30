import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  subcategory: string | null;
  material: string | null;
  is_new: boolean;
  is_bestseller: boolean;
}

const categoryConfig: Record<string, { title: string; description: string; subcategories: string[] }> = {
  rings: {
    title: "Rings",
    description: "Discover our exquisite collection of handcrafted rings",
    subcategories: ["Engagement Rings", "Wedding Bands", "Statement Rings", "Stackable Rings", "Birthstone Rings"],
  },
  necklaces: {
    title: "Necklaces",
    description: "Elegant necklaces to complement any outfit",
    subcategories: ["Pendant Necklaces", "Chain Necklaces", "Chokers", "Layered Necklaces", "Pearl Necklaces"],
  },
  earrings: {
    title: "Earrings",
    description: "From subtle studs to statement drops",
    subcategories: ["Stud Earrings", "Hoop Earrings", "Drop Earrings", "Chandelier Earrings", "Ear Cuffs"],
  },
  bracelets: {
    title: "Bracelets",
    description: "Timeless bracelets for every occasion",
    subcategories: ["Tennis Bracelets", "Bangles", "Cuff Bracelets", "Chain Bracelets", "Charm Bracelets"],
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const config = categoryConfig[category || "rings"];
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      setIsLoading(true);
      // Map URL category to database category format
      const categoryMap: Record<string, string> = {
        rings: "Rings",
        necklaces: "Necklaces",
        earrings: "Earrings",
        bracelets: "Bracelets",
      };
      
      const dbCategory = categoryMap[category];
      
      const { data, error } = await supabase
        .from('products')
        .select('id, name, price, image_url, subcategory, material, is_new, is_bestseller')
        .eq('category', dbCategory)
        .eq('status', 'Active');

      if (error) {
        console.error('Error fetching products:', error);
      } else {
        setProducts(data || []);
      }
      setIsLoading(false);
    };

    fetchProducts();
  }, [category]);

  if (!config) {
    return <div>Category not found</div>;
  }

  const filteredProducts = selectedSubcategory === "All" 
    ? products 
    : products.filter(p => p.subcategory === selectedSubcategory);

  const isInWishlist = (productId: string) => 
    wishlistItems.some(item => item.id === productId);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif text-foreground mb-4"
          >
            {config.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {config.description}
          </motion.p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by Type:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedSubcategory === "All" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSubcategory("All")}
            >
              All
            </Button>
            {config.subcategories.map((sub) => (
              <Button
                key={sub}
                variant={selectedSubcategory === sub ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubcategory(sub)}
              >
                {sub}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} products
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No products found in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image_url || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400"}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-2">
                      {product.is_new && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                      {product.is_bestseller && (
                        <Badge variant="secondary">Bestseller</Badge>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => handleAddToWishlist(product)}
                      className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                        isInWishlist(product.id)
                          ? "bg-primary text-primary-foreground"
                        : "bg-background/80 text-foreground hover:bg-primary hover:text-primary-foreground"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  </button>

                  {/* Quick Add Button */}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full gap-2"
                      size="sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-xs text-primary font-medium mb-1">
                    {product.subcategory}
                  </p>
                  <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {product.material}
                  </p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-foreground">
                      ${product.price.toLocaleString()}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAddToCart(product)}
                      className="text-primary hover:text-primary-foreground hover:bg-primary"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
