import { fontSans,fontHand } from "@/assets/fonts";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import type { Metadata } from "next";
import ToasterProvider from "@/components/dashboard/shared/Toaster";
import TrpcClientProvider from "@/providers/TrpcClientProvider";
import ClerkThemeProvider from "@/providers/ClerkProvider";
import ProgressBarProvider from "@/providers/ProgressBarProvider";

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
            "min-h-screen bg-background antialiased",
            fontSans.className,
            fontHand.variable
          )}
        >
          <ProgressBarProvider>
            <ThemeProvider attribute="class" defaultTheme="light">
              <ClerkThemeProvider>
                <TrpcClientProvider>
                  <div className="relative flex flex-col min-h-screen">
                    {children}
                  </div>
                  <ToasterProvider />
                </TrpcClientProvider>
              </ClerkThemeProvider>
            </ThemeProvider>
          </ProgressBarProvider>
        </body>
      </html>
    </>
  );
}
