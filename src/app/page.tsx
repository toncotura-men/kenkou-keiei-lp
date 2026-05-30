import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import MarqueeSection from "@/components/MarqueeSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ScrollFeature from "@/components/ScrollFeature";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black">
      <Navigation />
      <HeroSection />
      <MarqueeSection />
      <ServicesSection />
      <ResultsSection />
      <ScrollFeature />
      <TestimonialsSection />
      <PricingSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
