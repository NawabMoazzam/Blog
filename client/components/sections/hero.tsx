import { ArrowRight, Play, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { WHATSAPP_LINK, btnGradient, gradientBG, gradientText } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-16"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full blur-3xl animate-pulse bg-radial from-primary to-transparent" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full rounded-full blur-3xl animate-pulse bg-radial from-primary to-transparent delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "14px 24px",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm border border-primary rounded-full mb-8">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            Best IPTV Restream Provider Worldwide
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className={gradientBG}>IPTV Restream</span>
          <br />
          <span>Channels Without Borders</span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          IPTV Restream Access 9500+ premium channels, on-demand content, and live television from across the globe. Most Reliable Internet Protocol TV Subscription Service Provider.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            variant={"default"}
            asChild
            className={`h-14 w-50 flex items-center gap-2 ${btnGradient}`}
          >
            <Link href={WHATSAPP_LINK} target="_blank" className="group">
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          {/* <Button variant={"outline"} className="group h-14 w-40">
            <Play className="w-5 h-5" />
            Watch Demo
          </Button> */}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
          {[
            { number: "9500+", label: "Channels" },
            { number: "99.9%", label: "Uptime" },
            { number: "150+", label: "Countries" },
            { number: "24/7", label: "Support" },
          ].map((stat, index) => (
            <Card
              key={index}
              className="border border-primary hover:bg-accent transition-all duration-300"
            >
              <CardContent>
                <div className={`text-3xl font-bold ${gradientText}`}>
                  {stat.number}
                </div>
                <div className="text-muted-foreground mt-1">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
