import { btnGradient, gradientText, WHATSAPP_LINK } from "@/lib/utils";
import { ArrowRight, ChevronDown } from "lucide-react";
import Script from "next/script";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const faqs = [
  {
    "@type": "Question",
    "@id": "#faq-1",
    name: "How to start with Restream?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Contact us on WhatsApp to get your free trial. If you like the service, we’ll share the payment options. Once the payment is completed, we’ll get you started — all through WhatsApp.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-2",
    name: "Can I get a free trial before purchasing an IPTV plan?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Sure, simply contact us via WhatsApp and request a trial. Click on the Contact Us.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-3",
    name: "Which payment options are available?",
    acceptedAnswer: {
      "@type": "Answer",
      text: `We currently accept payments via PayPal, Skrill, and Crypto (including Bitcoin).
Below are the details for purchasing a reseller account:
1) PayPal: Use the Friends and Family option only
2) Email: [email protected]
3) Bitcoin (BTC): Contact us for the updated wallet address.
4) Other Crypto: Contact us to get the updated wallet details for your preferred cryptocurrency.
5) Skrill: Contact us for the updated payment email.
If you need any help, feel free to message us anytime.`,
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-4",
    name: "What is the difference between reseller and restream?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Restream is suitable only if you already own a server — meaning you have your IPTV panel, connected servers, and everything running, and you just need channels. However, if you’re new to this business and want to earn from it — especially if you’re unsure whether clients will buy from you — then a reseller account is the best, risk-free option for you.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-5",
    name: "What are the terms and conditions of using restreaming?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Please note the following important points: Add the service only to your server — do not sell directly to clients. Do not exceed the allowed number of connections. Never share our direct connections publicly or sell them directly. Any violation of these terms may result in permanent closure or blockage of your line.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-6",
    name: "What to do after paying?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "After making the payment, please confirm with us on WhatsApp or via email, and we’ll get back to you ASAP.",
    },
  },
];

export default function FAQs() {
  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
      >
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs,
          datePublished: "2024-01-01",
          dateModified: new Date().toISOString().split("T")[0],
        })}
      </Script>

      <section
        id="faqs"
        className="relative px-4 sm:px-6 lg:px-8"
        aria-labelledby="faq-heading"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2
              id="faq-heading"
              className="text-4xl sm:text-5xl font-bold mb-4"
            >
              Frequently Asked <span className={gradientText}>Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our IPTV restream and
              reseller services
            </p>
          </div>

          <div className="space-y-1" role="list">
            {faqs.map((faq, index) => (
              <details
                key={index}
                id={faq["@id"].substring(1)}
                className="border border-border backdrop-blur-sm bg-muted/20 rounded-xl p-6 group"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                role="listitem"
              >
                <summary
                  className="flex items-center justify-between cursor-pointer list-none font-semibold text-lg hover:text-primary transition-colors"
                  itemProp="name"
                  aria-label={`Question: ${faq.name}`}
                >
                  <span className="pr-4">{faq.name}</span>
                  <span
                    className="text-primary transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    <ChevronDown />
                  </span>
                </summary>
                <div
                  className="mt-4 text-muted-foreground leading-relaxed"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                  role="region"
                  aria-label="Answer"
                >
                  <div itemProp="text">{faq.acceptedAnswer.text}</div>
                </div>
              </details>
            ))}
          </div>

          <Card className="mt-12 text-center border border-primary rounded-xl hover:bg-accent grid grid-cols-1 md:grid-cols-2 justify-center">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Still have questions?
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Our support team is available 24/7 to assist you with any IPTV
                inquiries
              </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-center">
              <Button variant={"default"} asChild>
                <Link
                  href={WHATSAPP_LINK}
                  target="_blank"
                  className={btnGradient}
                  aria-label="Contact support via WhatsApp"
                >
                  Contact Support
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}
