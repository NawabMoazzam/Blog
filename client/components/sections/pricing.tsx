import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { btnGradient, gradientText, WHATSAPP_LINK } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const plans = [
  {
    name: "Starter Pack",
    connections: 50,
    price: "€95",
    features: [
      "50 Connections",
      "9500+ Channels",
      "International Channels",
      "Channels Report Portal",
      "Separate Categories Access",
      "M3U8 Playlist",
      "SD/HD/FHD/4K",
    ],
    popular: false,
  },
  {
    name: "Combo Pack",
    connections: 100,
    price: "€180",
    features: [
      "100 Connections",
      "9500+ Channels",
      "International Channels",
      "Channels Report Portal",
      "Separate Categories Access",
      "M3U8 Playlist",
      "SD/HD/FHD/4K",
    ],
    popular: true,
  },
  {
    name: "Premium Pack",
    connections: 200,
    price: "€350",
    features: [
      "200 Connections",
      "9500+ Channels",
      "International Channels",
      "Channels Report Portal",
      "Separate Categories Access",
      "M3U8 Playlist",
      "SD/HD/FHD/4K",
    ],
    popular: false,
  },
  {
    name: "Enterprise Pack",
    connections: 500,
    price: "€650",
    features: [
      "500 Connections",
      "9500+ Channels",
      "International Channels",
      "Channels Report Portal",
      "Separate Categories Access",
      "M3U8 Playlist",
      "SD/HD/FHD/4K",
    ],
    popular: false,
  },
];
export default function PricingSection() {
  return (
    <section id="pricing" className="relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Choose Your <span className={gradientText}>Perfect Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Flexible pricing options to match your Restreaming needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`relative border border-primary transition-all duration-300 hover:shadow-ring hover:scale-105 ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">
                  {plan.name}
                </CardTitle>
                <div className={`text-5xl font-bold ${gradientText}`}>
                  {plan.price}
                </div>
                <div className="text-muted-foreground">per month</div>
                <div className="text-primary font-semibold">
                  {plan.connections} Connections
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-muted-foreground"
                    >
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant={plan.popular ? "default" : "outline"} asChild>
                  <Link
                    href={`https://wa.me/447411201496?text=Need%20${plan.connections}%20Connections`}
                    target="_blank"
                    className={`block w-full font-semibold text-center transition-all duration-300 ${
                      plan.popular
                        ? `${btnGradient}`
                        : `hover:ring ring-primary`
                    }`}
                  >
                    Order Now
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
