import { ThemeToggleWrapper } from "@/lib/client-side-wrappers";
import Link from "next/link";
import { navItems, WHATSAPP_LINK } from "@/lib/utils";
import Image from "next/image";
import { Shield, Users, Zap } from "lucide-react";

const LinkSection = ({
  links,
}: {
  links: { name: string; link: never | string }[];
}) => (
  <div className="flex justify-center space-y-4 flex-col mt-4">
    {links.map((link) => (
      <Link
        key={link.name}
        className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
        href={`${link.link}`}
        target="_blank"
      >
        <span className="w-0 h-0.5 bg-primary transition-all group-hover:w-4"></span>
        {link.name}
      </Link>
    ))}
  </div>
);

const policyLinks = [
  { name: "Privacy Policy", link: "/privacy-policy" },
  { name: "Terms of Service", link: "/terms-of-service" },
  { name: "Cookie Policy", link: "/cookie-policy" },
];

const socialmediaLinks = [
  { name: "Instagram", link: "https://www.instagram.com/iptvrestreamvip/" },
  { name: "Whatsapp", link: WHATSAPP_LINK },
  { name: "Twitter / X", link: "https://x.com/iptv_restream" },
];

export default function Footer() {
  return (
    <footer className="relative border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12 text-sm text-muted-foreground">
          <div className="lg:col-span-3 md:col-span-2">
            <Link
              href={"/"}
              className="mr-4 md:flex items-center space-x-2 mb-4 relative"
            >
              <Image src="/Logo.svg" alt="logo" width={150} height={45} />
            </Link>
            <div className="max-w-xs">
              Our support team is available 24/7 to assist you. Whether it's day
              or night, you can reach out to us anytime through our contact
              channels. We’re committed to providing fast and helpful responses
              to all your questions or issues. Your satisfaction is our
              priority, and we're always here to help.
            </div>
            <div className="mt-10">
              Designed and Developed by{" "}
              <Link
                className="text-primary hover:underline"
                href="https://nawabwebfolio.vercel.app/"
                target="_blank"
              >
                Nawab Moazzam
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 items-start mt-10 md:mt-0">
            <LinkSection links={navItems} />
            <LinkSection links={socialmediaLinks} />
            <ThemeToggleWrapper className="col-span-2 justify-self-center" />
          </div>
        </div>
        <div className="py-8 mt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; Copyright {new Date().getFullYear()}{" "}
              <Link href={"/"}>
                <span className="text-primary font-bold">
                  IPTV Restream Vip
                </span>{" "}
              </Link>
              | All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Secure Payment
              </span>
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                99.9% Uptime
              </span>
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
