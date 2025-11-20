import Link from "next/link";
import { Button } from "../ui/button";
import { btnGradient, WHATSAPP_LINK } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../ui/card";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function CTASection() {
  return (
    <section id="contact" className="relative px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="border border-primary rounded-3xl">
          <CardTitle className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Start Streaming?
          </CardTitle>
          <CardDescription className="text-xl text-muted-foreground mb-8">
            Join thousands of satisfied customers enjoying premium IPTV service
          </CardDescription>
          <CardFooter>
            <CardAction className="flex items-center justify-center w-full">
              <Button
                variant={"default"}
                asChild
                className={`h-14 w-max flex items-center gap-2 ${btnGradient}`}
              >
                <Link href={WHATSAPP_LINK} target="_blank" className="group">
                  <IconBrandWhatsapp
                    style={{
                      height: "calc(var(--spacing) * 12)",
                      width: "calc(var(--spacing) * 12)",
                    }}
                  />
                  Contact us on WhatsApp
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}
