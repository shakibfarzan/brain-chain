import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PropsWithChildren } from "react";
import { config } from "@fortawesome/fontawesome-svg-core";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import Navbar from "@/components/ui/navbar";

config.autoAddCss = false;

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const nextFont = Inter({
  subsets: ["latin"],
  display: "swap",
});

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html suppressHydrationWarning className={nextFont.className} lang="en">
      <body className="min-h-screen main-background font-sans antialiased">
        <Providers
          themeProps={{
            attribute: "class",
            enableSystem: true,
          }}
        >
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <ScrollShadow className="h-screen">
              <main className="container mx-auto max-w-7xl py-8 px-6 flex-grow">
                {children}
              </main>
            </ScrollShadow>
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
