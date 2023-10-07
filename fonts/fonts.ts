import { Public_Sans, Roboto, Noto_Serif } from "next/font/google";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

// If loading a variable font, you don't need to specify the font weight
export const publicSans = Public_Sans({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-publicSans",
});

export const notoSerif = Noto_Serif({
  weight: ["100", "300", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-notoSerif",
});
