import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Bricolage_Grotesque as FontDisplay,
  Gochi_Hand as FontHand,
} from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  fallback: ["system-ui", "sans-serif", "serif"],
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontHand = FontHand({
  subsets: ["latin"],
  style: "normal",
  weight: "400",
  variable: "--font-hand",
});

export const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
