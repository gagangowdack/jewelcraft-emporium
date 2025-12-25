import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const products = [
  { id: 1, name: "Celestial Diamond Ring", category: "Rings", price: 4500 },
  { id: 2, name: "Aurora Pearl Necklace", category: "Necklaces", price: 2800 },
  { id: 3, name: "Moonlight Sapphire Earrings", category: "Earrings", price: 3200 },
  { id: 4, name: "Eternal Love Bracelet", category: "Bracelets", price: 1950 },
  { id: 5, name: "Starlight Diamond Pendant", category: "Necklaces", price: 5800 },
  { id: 6, name: "Royal Emerald Ring", category: "Rings", price: 7200 },
];

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState(products);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-background rounded-2xl shadow-elevated overflow-hidden"
          >
            {/* Search Header */}
            <div className="flex items-center gap-4 p-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for jewelry..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-0 focus-visible:ring-0 text-lg"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-4">
              {results.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                    {searchQuery ? `${results.length} Results` : "Popular Items"}
                  </p>
                  {results.map((product) => (
                    <motion.a
                      key={product.id}
                      href={`#product-${product.id}`}
                      onClick={onClose}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                    >
                      <div>
                        <p className="font-display group-hover:text-gold transition-colors">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                      <p className="text-gold font-display">${product.price.toLocaleString()}</p>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="p-4 border-t border-border bg-muted/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                Quick Links
              </p>
              <div className="flex flex-wrap gap-2">
                {["Rings", "Necklaces", "Earrings", "Bracelets", "New Arrivals"].map(
                  (link) => (
                    <a
                      key={link}
                      href={`#${link.toLowerCase().replace(" ", "-")}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-full bg-background border border-border text-sm hover:border-gold hover:text-gold transition-colors"
                    >
                      {link}
                    </a>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
