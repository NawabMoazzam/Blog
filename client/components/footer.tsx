import { ThemeToggleWrapper } from "@/lib/client-side-wrappers";
import Link from "next/link";
import { navItems } from "@/lib/utils";
import Image from "next/image";

const LinkSection = ({
  links,
}: {
  links: { name: string; link: never | string }[];
}) => (
  <div className="flex justify-center space-y-4 flex-col mt-4">
    {links.map((link) => (
      <Link
        key={link.name}
        className="transition-colors hover:text-muted-foreground text-foreground text-xs sm:text-sm"
        href={`${link.link}`}
      >
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
  { name: "Twitter", link: "https://twitter.com" },
  { name: "Facebook", link: "https://facebook.com" },
  { name: "LinkedIn", link: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="relative">
      <div className="border-t border-border px-8 pt-20 pb-32 relative bg-background">
        <div className="max-w-7xl mx-auto text-sm text-muted-foreground flex sm:flex-row flex-col justify-between items-start ">
          <div>
            <Link href={"/"} className="mr-4 md:flex items-center space-x-2 mb-4 relative">
              <Image src={"/logo-dark.png"} alt="Logo" width={30} height={30} />
              <span className="font-medium text-foreground">Startup</span>
            </Link>
            <div className="max-w-xs">
              LaunchPad is a rapid content delivery platform that helps you
              deliver content to your users in a fast and efficient way.
            </div>
            <div className="mt-4">Copyright &copy; 2024 Strapi INC</div>
            <div className="mt-10">
              Designed and Developed by{" "}
              <Link
                className="text-foreground underline"
                href="https://aceternity.com"
              >
                Aceternity
              </Link>{" "}
              &{" "}
              <Link
                className="text-foreground underline"
                href="https://strapi.io"
              >
                Strapi
              </Link>
            </div>
            <div className="mt-2">
              built with{" "}
              <Link
                className="text-foreground underline"
                href="https://strapi.io"
              >
                Strapi
              </Link>
              ,{" "}
              <Link
                className="text-foreground underline"
                href="https://nextjs.org"
              >
                Next.js
              </Link>
              ,{" "}
              <Link
                className="text-foreground underline"
                href="https://tailwindcss.com"
              >
                Tailwind CSS
              </Link>
              ,{" "}
              <Link
                className="text-foreground underline"
                href="https://framer.com/motion"
              >
                Motion Animation Lib
              </Link>
              , and{" "}
              <Link
                className="text-foreground underline"
                href="https://ui.aceternity.com"
              >
                Aceternity UI
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10 items-start mt-10 md:mt-0">
            <LinkSection links={navItems} />
            <LinkSection links={policyLinks} />
            <LinkSection links={socialmediaLinks} />
            <ThemeToggleWrapper className="col-start-2" />
          </div>
        </div>
      </div>
    </footer>
  );
}
