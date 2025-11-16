import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import AboutSection from "@/components/sections/about";
import PricingSection from "@/components/sections/pricing";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-24">
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <PricingSection />
      {/* CTA Section */}
      <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-card backdrop-blur-sm border border-primary rounded-3xl p-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Start Streaming?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied customers enjoying premium IPTV
              service
            </p>
            <Button variant={"default"} asChild>
              <Link
                href={WHATSAPP_LINK}
                className="inline-flex items-center gap-2 px-8 py-4 btn-primary rounded-lg font-semibold text-lg"
              >
                Contact Us on WhatsApp
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
