import GlobeRenderer from "@/components/globe-renderer";
import { PRICING_CARDS, WHATSAPP_LINK } from "@/lib/utils";
import { Metadata } from "next";
import { Testimonials } from "@/components/testimonials";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Extract pricing card component
function PricingCard({ card }: { card: (typeof PRICING_CARDS)[0] }) {
  return (
    <Card className="text-center group transition duration-200 hover:-translate-y-1">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{card.name}</CardTitle>
        <CardDescription className="font-medium text-primary">
          {card.desc}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-baseline mb-8">
          <span className="mr-2 text-5xl font-extrabold">${card.price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-3 text-left">
          {card.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-3">
              <CheckCheck className="shrink-0 w-5 h-5 text-primary" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          variant="default"
          asChild
          className="w-full hover:-translate-y-0.5 transition duration-200"
        >
          <Link href={WHATSAPP_LINK} prefetch={false}>
            Order Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export const metadata: Metadata = {
  title: "Best IPTV Service Provider - Worldwide Coverage",
  description:
    "Get premium IPTV services with 9500+ channels, HD/4K quality, and affordable pricing plans.",
  openGraph: {
    title: "Best IPTV Service Provider - Worldwide Coverage",
    description: "Premium IPTV services with 9500+ channels and HD/4K quality",
    type: "website",
  },
};

export default async function Home() {
  return (
    <div className="px-8 space-y-8">
      <section className="flex flex-row items-center justify-center h-screen md:h-auto bg-background relative w-full">
        <div className="max-w-7xl mx-auto w-full relative overflow-hidden h-full md:h-160 grid grid-cols-1 lg:grid-cols-2 items-center justify-center">
          <div>
            <h1 className="text-center text-xl md:text-4xl font-bold text-foreground">
              We provide best services worldwide
            </h1>
            <p className="text-center text-base md:text-lg font-normal text-muted-foreground max-w-md mt-2 mx-auto">
              Best IPTV Service Provider In the World. We provide access to a
              wide range of live television channels, on-demand movies and TV
              shows, with multiple quality options.
            </p>
          </div>
          <Suspense
            fallback={
              <div className="h-full w-full flex items-center justify-center">
                <Skeleton className="w-9/12 h-9/12 rounded-full" />
              </div>
            }
          >
            <GlobeRenderer />
          </Suspense>
        </div>
      </section>

      <section id="pricing">
        <div className="mx-auto">
          <div className="mx-auto max-w-3xl text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-foreground">
              Best Value IPTV Restream Plans
            </h2>
            <p className="mb-5 font-light text-muted-foreground sm:text-xl">
              Affordable plans with high-quality content available in multiple
              languages and regions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRICING_CARDS.map((card) => (
              <PricingCard key={card.name} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="mx-auto max-w-3xl text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-foreground">
            Our Happy Clients :)
          </h2>
          <p className="mb-5 font-light text-muted-foreground sm:text-xl">
            See What People Say About Us.
          </p>
        </div>
        <Testimonials />
      </section>
    </div>
  );
}
