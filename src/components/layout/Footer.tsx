import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const footerLinks = {
  shop: [
    { name: "All Jewelry", href: "#" },
    { name: "Rings", href: "#" },
    { name: "Necklaces", href: "#" },
    { name: "Earrings", href: "#" },
    { name: "Bracelets", href: "#" },
    { name: "Watches", href: "#" },
  ],
  about: [
    { name: "Our Story", href: "#" },
    { name: "Craftsmanship", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Press", href: "#" },
    { name: "Careers", href: "#" },
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
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "Youtube" },
];

export const Footer = () => {
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
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-gold"
              />
              <Button className="bg-gradient-gold text-charcoal hover:opacity-90 font-body uppercase tracking-wider px-8">
                Subscribe
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
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gold" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gold" />
                <span>hello@lumiere.com</span>
              </div>
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
              <a href="#" className="hover:text-gold transition-colors font-body">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors font-body">Terms</a>
              <a href="#" className="hover:text-gold transition-colors font-body">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
