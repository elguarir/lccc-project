import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Bricolage_Grotesque as FontDisplay,
} from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontHeading = localFont({
  src: "./GeneralSans.woff2",
  variable: "--font-heading",
});


export const fontHome = localFont({
  src: [
    {
      path: "./CabinetGrotesk-Regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "./CabinetGrotesk-Medium.otf",
      style: "normal",
      weight: "500",
    },
    {
      path: "./CabinetGrotesk-Bold.otf",
      style: "normal",
      weight: "700",
    },
    {
      path: "./CabinetGrotesk-Extrabold.otf",
      style: "normal",
      weight: "900",
    },
  ],
  variable: "--font-home",
});

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
