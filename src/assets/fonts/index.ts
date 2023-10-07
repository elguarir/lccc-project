import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
  Bricolage_Grotesque as FontDisplay,
} from 'next/font/google';
import localFont from 'next/font/local'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const fontHeading = localFont({
  src: './GeneralSans.woff2',
  variable: '--font-heading',
});

export const fontDisplay = FontDisplay({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});