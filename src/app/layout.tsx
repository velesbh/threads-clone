import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import FullscreenImageView from "@/components/fullscreen-image-view";
import Loading from "@/app/(pages)/loading";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://ignite.codebustar.com'),
  title: {
    default: "Ignite",
    template: `%s • Ignite`,
  },
  description: "Ignite - Clone of Threads by Meta, built with Next.js, Clerk, and NeonDB.",
  keywords: [
    "nextjs",
    "prisma",
    "tRPC",
    "ignite",
    "ignite-clone",
    "t3-stack",
    "uploadthing",
    "shadcn ui"
  ],
  authors: [
    {
      name: "sujjeee",
      url: "https://x.com/sujjeeee",
    },
  ],
  creator: "sujjeee",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ignite.codebustar.com",
    title: "Ignite",
    description: "Ignite - Clone of Threads by Meta, built with Next.js, Clerk, and NeonDB.",
    siteName: "Ignite",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ignite",
    description: "Ignite - Clone of Threads by Meta, built with Next.js, Clerk, and NeonDB.",
    images: [siteConfig.ogImage],
    creator: "@sujjeeee",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`font-sans no-scrollbar ${inter.variable}`}>
          <TRPCReactProvider headers={headers()}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              {children}
              <Toaster />
              <Suspense fallback={<Loading />}>
                <FullscreenImageView />
              </Suspense>
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
