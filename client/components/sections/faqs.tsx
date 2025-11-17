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
    name: "What is the difference between IPTV reseller and restream services?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Restream is ideal if you already own a server with an IPTV panel and servers attached - you just need channels to add to your existing infrastructure. A reseller account is better if you're new to the IPTV business and want to earn with risk-free options without being certain about client acquisition. With a reseller account, you get a complete package including credits, panel access, and support to start your IPTV business immediately.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-2",
    name: "Can I get a free trial before purchasing an IPTV plan?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes, we offer free trials so you can test our IPTV service quality before making any commitment. Simply contact us via WhatsApp and request a trial by clicking the Contact Now button on our website. Our team will set up your trial account within minutes, allowing you to experience our channel quality, server stability, and streaming performance firsthand.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-3",
    name: "What are the terms and conditions for IPTV restreaming?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Our IPTV restreaming terms include: 1) Only add channels to your server infrastructure, not for direct sale to end clients. 2) Never exceed your allowed connections limit to maintain service quality. 3) Never share our direct connections publicly or sell them directly to customers. 4) Violation of these terms may result in permanent closure or blockage of your line without refund. These terms ensure service stability and protect all parties involved in the restreaming process.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-4",
    name: "How many channels are included in your IPTV service?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Our IPTV service includes access to over 9500+ premium live TV channels from around the world, covering news, sports, entertainment, movies, documentaries, and more in multiple languages. We regularly update our channel lineup to include the latest additions and remove any non-working channels to ensure the best viewing experience for your customers.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-5",
    name: "What streaming quality does your IPTV service support?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "We support multiple streaming qualities including SD (Standard Definition), HD (High Definition), FHD (Full HD 1080p), and 4K Ultra HD resolution options for crystal-clear viewing experience. The streaming quality automatically adapts to your internet connection speed, ensuring smooth playback without buffering. Our adaptive bitrate technology delivers the best possible quality based on available bandwidth.",
    },
  },
  {
    "@type": "Question",
    "@id": "#faq-6",
    name: "What is your IPTV service uptime guarantee?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "We guarantee 99.9% uptime with enterprise-grade servers and infrastructure distributed across multiple data centers to ensure uninterrupted streaming service for our customers. Our redundant server architecture and 24/7 monitoring system automatically handle any technical issues, providing consistent reliability and minimal downtime for your IPTV business operations.",
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