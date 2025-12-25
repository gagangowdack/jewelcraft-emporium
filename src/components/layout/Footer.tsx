import { useState } from "react";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const footerLinks = {
  shop: [
    { name: "All Jewelry", href: "#new-arrivals" },
    { name: "Rings", href: "#rings" },
    { name: "Necklaces", href: "#necklaces" },
    { name: "Earrings", href: "#earrings" },
    { name: "Bracelets", href: "#new-arrivals" },
    { name: "Watches", href: "#new-arrivals" },
  ],
  about: [
    { name: "Our Story", href: "#about" },
    { name: "Craftsmanship", href: "#about" },
    { name: "Sustainability", href: "#about" },
    { name: "Press", href: "#about" },
    { name: "Careers", href: "#about" },
  ],
  support: [
    { name: "Contact Us", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Shipping", href: "#" },
    { name: "Returns", href: "#" },
    { name: "Ring Sizing", href: "#" },
  ],
};

const socialLinks = [
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Youtube, href: "https://youtube.com", label: "Youtube" },
];

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Welcome to Lumière!",
      description: "You've been subscribed to our exclusive newsletter.",
    });
    setEmail("");
    setIsSubmitting(false);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-charcoal text-cream">
      {/* Newsletter Section */}
      <div className="border-b border-cream/10">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl lg:text-4xl mb-4"
            >
              Join Our <span className="text-gradient-gold">Exclusive</span> Circle
            </motion.h3>
            <p className="text-cream/60 mb-8 font-body text-sm">
              Subscribe to receive first access to new collections, exclusive offers, and curated content.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold"
              />
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-gold text-charcoal hover:opacity-90 font-body uppercase tracking-wider px-8"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="font-display text-xl font-bold text-charcoal">L</span>
              </div>
              <span className="font-display text-2xl text-gradient-gold">Lumière</span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed mb-6 max-w-sm font-body">
              Crafting timeless elegance since 1987. Each piece tells a story of exquisite craftsmanship 
              and enduring beauty, designed to be treasured for generations.
            </p>
            <div className="space-y-3 text-sm text-cream/60">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-gold" />
                <span>5th Avenue, New York, NY 10001</span>
              </div>
              <a href="tel:+15551234567" className="flex items-center gap-3 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" />
                <span>+1 (555) 123-4567</span>
              </a>
              <a href="mailto:hello@lumiere.com" className="flex items-center gap-3 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" />
                <span>hello@lumiere.com</span>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gradient-gold">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-cream/60 hover:text-gold transition-colors font-body"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gradient-gold">About</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-sm text-cream/60 hover:text-gold transition-colors font-body"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-gradient-gold">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: link.name,
                        description: "This page will be available soon!",
                      });
                    }}
                    className="text-sm text-cream/60 hover:text-gold transition-colors font-body"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-cream/40 font-body">
              © 2024 Lumière Jewelry. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-cream/60" />
                </motion.a>
              ))}
            </div>
            <div className="flex items-center gap-6 text-sm text-cream/40">
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toast({ title: "Privacy Policy", description: "Coming soon!" });
                }}
                className="hover:text-gold transition-colors font-body"
              >
                Privacy
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toast({ title: "Terms of Service", description: "Coming soon!" });
                }}
                className="hover:text-gold transition-colors font-body"
              >
                Terms
              </a>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  toast({ title: "Cookie Policy", description: "Coming soon!" });
                }}
                className="hover:text-gold transition-colors font-body"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
