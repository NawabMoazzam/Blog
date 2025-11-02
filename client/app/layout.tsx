import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBarWrapper } from "@/lib/client-side-wrappers";
import Footer from "@/components/footer";
import { getGlobalData } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const global = await getGlobalData();
  const seo = global.defaultSeo;
  const faviconUrl = global.favicon.url;
  return {
    title: {
      default: seo.metaTitle || "My Site",
      template: `%s | ${seo.metaTitle || "My Site"}`,
    },
    description: seo.metaDescription,
    // keywords: seo?.keywords,
    icons: {
      icon: faviconUrl
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${faviconUrl}`
        : "/favicon.ico",
      shortcut: faviconUrl
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${faviconUrl}`
        : "/favicon.ico",
      apple: faviconUrl
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${faviconUrl}`
        : "/apple-touch-icon.png",
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: seo.shareImage.url
        ? [`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${seo.shareImage.url}`]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavBarWrapper />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
