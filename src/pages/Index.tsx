import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { Jewelry3DShowcase } from "@/components/sections/Jewelry3DShowcase";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { CollectionsSection } from "@/components/sections/CollectionsSection";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { AboutSection } from "@/components/sections/AboutSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CTASection } from "@/components/sections/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-body">
      <Header />
      <main>
        <HeroSection />
        <CollectionsSection />
        <FeaturedProducts />
        <Jewelry3DShowcase />
        <CategoryShowcase />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
