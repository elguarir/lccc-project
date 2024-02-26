import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import TrpcClientProvider from "@/providers/TrpcClientProvider";
import ClerkThemeProvider from "@/providers/ClerkProvider";
import { Toaster } from "@/components/ui/sonner";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { fontHeading } from "@/assets/fonts";

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background antialiased",
            GeistSans.className,
            GeistMono.variable,
            fontHeading.variable,
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="light">
            <ClerkThemeProvider>
              <TrpcClientProvider>
                <div className="relative flex flex-col min-h-screen">
                  {children}
                </div>
                <Toaster closeButton />
              </TrpcClientProvider>
            </ClerkThemeProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}

