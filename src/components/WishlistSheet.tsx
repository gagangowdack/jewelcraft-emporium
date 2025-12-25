import { motion } from "framer-motion";
import { Heart, X, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";

export const WishlistSheet = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart();

  const handleMoveToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    removeFromWishlist(item.id);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-full hover:bg-muted transition-colors hidden sm:flex"
        >
          <Heart className="w-5 h-5 text-foreground/70" />
          {wishlistItems.length > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-rose-gold text-charcoal text-xs">
              {wishlistItems.length}
            </Badge>
          )}
        </motion.button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <Heart className="w-6 h-6" />
            Your Wishlist
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {wishlistItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Heart className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-lg font-display mb-2">Your wishlist is empty</p>
              <p className="text-sm text-muted-foreground">
                Save your favorite pieces for later
              </p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex gap-4 p-4 rounded-xl bg-muted/50"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      {item.category}
                    </p>
                    <h4 className="font-display text-sm mb-1">{item.name}</h4>
                    <p className="text-gold font-display mb-3">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleMoveToCart(item)}
                        className="bg-gold text-charcoal hover:bg-gold-light text-xs"
                      >
                        <ShoppingBag className="w-3 h-3 mr-1" />
                        Add to Cart
                      </Button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
