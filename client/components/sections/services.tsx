import { gradientText } from "@/lib/utils";
import { Globe2, Shield, Star, Tv, Users, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: <Tv className="w-8 h-8" />,
    title: "9500+ Channels",
    description:
      "Access to premium live TV channels from around the world in multiple languages",
  },
  {
    icon: <Globe2 className="w-8 h-8" />,
    title: "International Coverage",
    description:
      "Stream content from every corner of the globe with seamless connectivity",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "4K Ultra HD",
    description:
      "Crystal clear streaming quality with SD, HD, FHD, and 4K resolution options",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure & Reliable",
    description:
      "99.9% uptime guarantee with enterprise-grade security and protection",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Multiple Connections",
    description:
      "Flexible plans supporting from 50 to 500+ simultaneous connections",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Premium Support",
    description:
      "24/7 dedicated customer support to ensure uninterrupted service",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Why Choose <span className={gradientText}>Our Service</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience premium IPTV Restreaming with unmatched quality and
            reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border border-primary hover:bg-accent transition-all duration-300"
            >
              <CardContent>
                <div className="w-16 h-16 border bg-primary/10 border-primary rounded-xl flex items-center justify-center mb-6 text-primary">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold mb-3">
                  {service.title}
                </CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
