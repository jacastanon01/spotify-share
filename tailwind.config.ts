import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primary: "#1DB954",
      secondary: "#191414",
      dark: {
        100: "#000000",
        200: "#0F1117",
        300: "#151821",
        400: "#212734",
        500: "#343434",
      },
      light: {
        900: "#FFFFFF",
        800: "#F4F6F8",
        850: "#FDFDFD",
        700: "#DCE3F1",
        500: "#7B8EC8",
        400: "#858EAD",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        publicSans: ["var(--font-publicSans)"],
        roboto: ["var(--font-roboto)"],
        inter: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
export default config;
