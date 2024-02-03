import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: ["Inter", "sans-serif", "system-ui", "serif"],
  display: "swap",
  preload: false,
});

export const fontHeading = localFont({
  src: "./CabinetGrotesk-Variable.woff2",
  fallback: ["Cabinet Grotesk", "sans-serif"],
  display: "swap",
  variable: "--font-heading",
});

export const fontMono = {
  subsets: ["latin"],
  variable: "--font-mono",
};

// export const fontHeading = FontHeading({
//   subsets: ["latin"],
//   variable: "--font-heading",
// });

// export const fontHand = FontHand({
//   subsets: ["latin"],
//   style: "normal",
//   weight: "400",
//   variable: "--font-hand",
// });
