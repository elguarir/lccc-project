import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Gochi_Hand as FontHand,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["Inter", "sans-serif", "system-ui", "serif"],
  display: "swap",
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

