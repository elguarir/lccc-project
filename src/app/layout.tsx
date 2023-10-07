import { fontDisplay, fontSans, fontHeading, fontMono } from "@/assets/fonts";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/plate/tooltip";
import { TailwindIndicator } from "@/components/site/tailwind-indicator";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import ProgressBarProvider from "@/providers/ProgressBarProvider";
import ToasterProvider from "@/components/dashboard/shared/Toaster";
import TrpcClientProvider from "@/providers/TrpcClientProvider";

export const metadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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
            "min-h-screen bg-background font-sans antialiased",
            "[&_.slate-selected]:!bg-primary/20 [&_.slate-selection-area]:border [&_.slate-selection-area]:border-primary [&_.slate-selection-area]:bg-primary/10",
            fontSans.variable,
            fontDisplay.variable,
            fontHeading.variable,
            fontMono.variable
          )}
        >
          <ProgressBarProvider>
            <TrpcClientProvider>
              <ThemeProvider attribute="class" defaultTheme="light">
                <TooltipProvider
                  disableHoverableContent
                  delayDuration={500}
                  skipDelayDuration={0}
                >
                  <div className="relative flex flex-col min-h-screen">
                    {children}
                  </div>
                  <ToasterProvider />
                  <TailwindIndicator />
                </TooltipProvider>
              </ThemeProvider>
            </TrpcClientProvider>
          </ProgressBarProvider>
        </body>
      </html>
    </>
  );
}
