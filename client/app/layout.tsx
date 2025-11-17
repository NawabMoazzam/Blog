import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavBarWrapper } from "@/lib/client-side-wrappers";
import Footer from "@/components/footer";
import { getGlobalData, getStrapiMedia } from "@/lib/utils";
import NextTopLoader from "nextjs-toploader";

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
  const faviconUrl = getStrapiMedia(global.favicon.url);
  return {
    title: {
      default: `Home | ${seo.metaTitle}`,
      template: `%s | ${seo.metaTitle}`,
    },
    description: seo.metaDescription,
    // keywords: seo?.keywords,
    icons: {
      icon: `${faviconUrl}`,
      shortcut: `${faviconUrl}`,
      apple: `${faviconUrl}`,
    },
    openGraph: {
      title: seo.metaTitle,
      description: seo.metaDescription,
      images: [`${getStrapiMedia(seo.shareImage.url)}`],
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
          <NextTopLoader color="var(--primary)" showSpinner={false} />
          <NavBarWrapper />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
