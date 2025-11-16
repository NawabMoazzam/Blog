import { gradientText } from "@/lib/utils";
import { Globe2, Shield, Tv, Zap } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export default function AboutSection() {
  return (
    <section id="about" className="relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              About <span className={gradientText}>Our Platform</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We are the world's leading IPTV restream service provider,
              delivering premium entertainment to millions of users across 150+
              countries. Our platform combines cutting-edge technology with an
              extensive content library to provide an unparalleled streaming
              experience.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              With over 9500 channels spanning news, sports, entertainment, and
              more, we offer something for everyone. Our infrastructure is built
              on enterprise-grade servers ensuring 99.9% uptime and
              lightning-fast content delivery.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <Card className="border border-primary hover:bg-accent">
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    5+ Years
                  </div>
                  <div className="text-muted-foreground">
                    Industry Experience
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-primary hover:bg-accent">
                <CardContent>
                  <div className="text-3xl font-bold text-primary mb-2">
                    10k+
                  </div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="relative">
            <Card className="aspect-square border border-primary rounded-3xl flex items-center justify-center">
              <CardContent className="grid grid-cols-2 gap-4 w-full">
                {[
                  { icon: <Tv className="w-12 h-12" />, label: "Live TV" },
                  { icon: <Globe2 className="w-12 h-12" />, label: "Global" },
                  { icon: <Zap className="w-12 h-12" />, label: "Fast" },
                  { icon: <Shield className="w-12 h-12" />, label: "Secure" },
                ].map((item, idx) => (
                  <Card
                    key={idx}
                    className="border border-primary rounded-2xl hover:bg-accent transition-all duration-300"
                  >
                    <CardContent className="flex flex-col items-center justify-center ">
                      <div className="w-12 h-12 text-primary mb-3">
                        {item.icon}
                      </div>
                      <div className="text-sm font-semibold">{item.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
