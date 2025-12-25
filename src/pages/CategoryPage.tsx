import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  subcategory: string;
  material: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const categoryData: Record<string, { title: string; description: string; subcategories: string[]; products: Product[] }> = {
  rings: {
    title: "Rings",
    description: "Discover our exquisite collection of handcrafted rings",
    subcategories: ["Engagement Rings", "Wedding Bands", "Statement Rings", "Stackable Rings", "Birthstone Rings"],
    products: [
      { id: "ring-1", name: "Diamond Solitaire Ring", price: 2499, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", subcategory: "Engagement Rings", material: "18K White Gold" },
      { id: "ring-2", name: "Vintage Rose Gold Band", price: 899, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400", subcategory: "Wedding Bands", material: "14K Rose Gold", isBestseller: true },
      { id: "ring-3", name: "Emerald Statement Ring", price: 1899, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400", subcategory: "Statement Rings", material: "18K Yellow Gold", isNew: true },
      { id: "ring-4", name: "Thin Gold Stacking Ring", price: 299, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", subcategory: "Stackable Rings", material: "14K Gold" },
      { id: "ring-5", name: "Sapphire Birthstone Ring", price: 1299, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", subcategory: "Birthstone Rings", material: "Sterling Silver" },
      { id: "ring-6", name: "Platinum Wedding Band", price: 1599, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400", subcategory: "Wedding Bands", material: "Platinum" },
      { id: "ring-7", name: "Three Stone Engagement Ring", price: 3299, image: "https://images.unsplash.com/photo-1586104195538-050b9f74f58e?w=400", subcategory: "Engagement Rings", material: "18K White Gold", isNew: true },
      { id: "ring-8", name: "Twisted Gold Band", price: 449, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400", subcategory: "Stackable Rings", material: "14K Yellow Gold", isBestseller: true },
    ]
  },
  necklaces: {
    title: "Necklaces",
    description: "Elegant necklaces to complement any outfit",
    subcategories: ["Pendant Necklaces", "Chain Necklaces", "Chokers", "Layered Necklaces", "Pearl Necklaces"],
    products: [
      { id: "neck-1", name: "Diamond Pendant Necklace", price: 1899, image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=400", subcategory: "Pendant Necklaces", material: "18K White Gold", isBestseller: true },
      { id: "neck-2", name: "Cuban Link Chain", price: 799, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400", subcategory: "Chain Necklaces", material: "14K Gold" },
      { id: "neck-3", name: "Velvet Pearl Choker", price: 599, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400", subcategory: "Chokers", material: "Freshwater Pearls", isNew: true },
      { id: "neck-4", name: "Multi-Layer Gold Necklace", price: 1099, image: "https://images.unsplash.com/photo-1599458252573-56ae36120de1?w=400", subcategory: "Layered Necklaces", material: "14K Gold" },
      { id: "neck-5", name: "South Sea Pearl Strand", price: 2499, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400", subcategory: "Pearl Necklaces", material: "South Sea Pearls" },
      { id: "neck-6", name: "Heart Pendant", price: 699, image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400", subcategory: "Pendant Necklaces", material: "Sterling Silver", isNew: true },
      { id: "neck-7", name: "Snake Chain Necklace", price: 449, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", subcategory: "Chain Necklaces", material: "14K Rose Gold" },
      { id: "neck-8", name: "Crystal Choker", price: 399, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", subcategory: "Chokers", material: "Crystal & Gold", isBestseller: true },
    ]
  },
  earrings: {
    title: "Earrings",
    description: "From subtle studs to statement drops",
    subcategories: ["Stud Earrings", "Hoop Earrings", "Drop Earrings", "Chandelier Earrings", "Ear Cuffs"],
    products: [
      { id: "ear-1", name: "Diamond Stud Earrings", price: 1299, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400", subcategory: "Stud Earrings", material: "18K White Gold", isBestseller: true },
      { id: "ear-2", name: "Large Gold Hoops", price: 599, image: "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=400", subcategory: "Hoop Earrings", material: "14K Gold" },
      { id: "ear-3", name: "Sapphire Drop Earrings", price: 1899, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400", subcategory: "Drop Earrings", material: "18K White Gold", isNew: true },
      { id: "ear-4", name: "Crystal Chandelier", price: 899, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", subcategory: "Chandelier Earrings", material: "Sterling Silver" },
      { id: "ear-5", name: "Modern Ear Cuff", price: 299, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400", subcategory: "Ear Cuffs", material: "14K Gold", isNew: true },
      { id: "ear-6", name: "Pearl Stud Earrings", price: 399, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400", subcategory: "Stud Earrings", material: "Freshwater Pearls" },
      { id: "ear-7", name: "Twisted Hoops", price: 449, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400", subcategory: "Hoop Earrings", material: "14K Rose Gold", isBestseller: true },
      { id: "ear-8", name: "Emerald Drop", price: 1599, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400", subcategory: "Drop Earrings", material: "18K Yellow Gold" },
    ]
  },
  bracelets: {
    title: "Bracelets",
    description: "Timeless bracelets for every occasion",
    subcategories: ["Tennis Bracelets", "Bangles", "Cuff Bracelets", "Chain Bracelets", "Charm Bracelets"],
    products: [
      { id: "brac-1", name: "Diamond Tennis Bracelet", price: 3999, image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400", subcategory: "Tennis Bracelets", material: "18K White Gold", isBestseller: true },
      { id: "brac-2", name: "Gold Bangle Set", price: 899, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400", subcategory: "Bangles", material: "14K Gold" },
      { id: "brac-3", name: "Statement Cuff", price: 699, image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400", subcategory: "Cuff Bracelets", material: "Sterling Silver", isNew: true },
      { id: "brac-4", name: "Delicate Chain Bracelet", price: 399, image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400", subcategory: "Chain Bracelets", material: "14K Rose Gold" },
      { id: "brac-5", name: "Pearl Charm Bracelet", price: 599, image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400", subcategory: "Charm Bracelets", material: "Sterling Silver & Pearls", isNew: true },
      { id: "brac-6", name: "Ruby Tennis Bracelet", price: 2899, image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=400", subcategory: "Tennis Bracelets", material: "18K Yellow Gold" },
      { id: "brac-7", name: "Hammered Gold Bangle", price: 549, image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400", subcategory: "Bangles", material: "14K Gold", isBestseller: true },
      { id: "brac-8", name: "Modern Link Chain", price: 799, image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400", subcategory: "Chain Bracelets", material: "14K White Gold" },
    ]
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { addToCart, addToWishlist, wishlistItems } = useCart();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("All");

  const data = categoryData[category || "rings"];
  
  if (!data) {
    return <div>Category not found</div>;
  }

  const filteredProducts = selectedSubcategory === "All" 
    ? data.products 
    : data.products.filter(p => p.subcategory === selectedSubcategory);

  const isInWishlist = (productId: string) => 
    wishlistItems.some(item => item.id === productId);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
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
            {data.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            {data.description}
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
            {data.subcategories.map((sub) => (
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
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-primary text-primary-foreground">New</Badge>
                    )}
                    {product.isBestseller && (
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
