import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  // Bricolage_Grotesque as FontHeading,
  // Gochi_Hand as FontHand,
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
  src: [
    {
      path: "./CabinetGrotesk-Thin.otf",
      weight: "100",
    },
    {
      path: "./CabinetGrotesk-Light.otf",
      weight: "300",
    },
    {
      path: "./CabinetGrotesk-Regular.otf",
      weight: "400",
    },
    {
      path: "./CabinetGrotesk-Medium.otf",
      weight: "500",
    },
    {
      path: "./CabinetGrotesk-Bold.otf",
      weight: "700",
    },
    {
      path: "./CabinetGrotesk-ExtraBold.otf",
      weight: "800",
    },
    {
      path: "./CabinetGrotesk-Black.otf",
      weight: "900",
    },
  ],
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
