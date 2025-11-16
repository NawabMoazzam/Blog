import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import AboutSection from "@/components/sections/about";
import PricingSection from "@/components/sections/pricing";
import CTASection from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <AboutSection />
      <CTASection />
    </div>
  );
}
