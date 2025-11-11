import { GlobeRenderer } from "@/components/globe-renderer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCheck } from "lucide-react";
import Link from "next/link";

const pricingCards = [
  {
    name: "Starter Pack",
    desc: "50 Connections",
    price: 99,
    features: [
      "50 Connections",
      "9500+ Channels",
      "International Channels",
      "M3 U8 Playlis",
      "SD /HD /FHD /4K",
    ],
  },
  {
    name: "Combo Pack",
    desc: "100 Connections",
    price: 190,
    features: [
      "100 Connections",
      "9500+ Channels",
      "International Channels",
      "M3 U8 Playlis",
      "SD /HD /FHD /4K",
    ],
  },
  {
    name: "Premium Pack",
    desc: "200 Connections",
    price: 370,
    features: [
      "200 Connections",
      "9500+ Channels",
      "International Channels",
      "M3 U8 Playlis",
      "SD /HD /FHD /4K",
    ],
  },
  {
    name: "Enterprise Pack",
    desc: "500 Connections",
    price: 700,
    features: [
      "500 Connections",
      "9500+ Channels",
      "International Channels",
      "M3 U8 Playlis",
      "SD /HD /FHD /4K",
    ],
  },
];

export default async function Home() {
  return (
    <div className="px-8 lg:px-16 space-y-20">
      <section id="hero">
        <GlobeRenderer />
      </section>

      <section id="pricing">
        <div className="py-8 mx-auto lg:py-16 ">
          <div className="mx-auto max-w-3xl text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-foreground">
              Best Value IPTV Restream Plans
            </h2>
            <p className="mb-5 font-light text-muted-foreground sm:text-xl">
              We provide the best IPTV services worldwide. Our services are affordable and offer high-quality content. Our services are available in multiple languages and regions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {pricingCards.map((priceCard, index) => (
              <Card key={index} className="text-center group transition duration-200  hover:-translate-y-1">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">
                    {priceCard.name}
                  </CardTitle>
                  <CardDescription className="font-medium text-primary">
                    {priceCard.desc}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center items-baseline mb-8">
                    <span className="mr-2 text-5xl font-extrabold">
                      ${priceCard.price}
                    </span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <ul className="space-y-3 text-left">
                    {priceCard.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <CheckCheck className="shrink-0 w-5 h-5 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant={"default"} asChild className="w-full hover:-translate-y-0.5 transition duration-200">
                    <Link
                      href={
                        "https://api.whatsapp.com/send/?phone=923070494471&text=need_iptv_restream&type=phone_number&app_absent=0"
                      }
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
    </div>
  );
}
