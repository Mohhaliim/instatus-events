import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "gray-50": "#FAFAFA",
        "gray-100": "#F5F5F5",
        "gray-200": "#EEEEEE",
        "gray-300": "#FBFBFB",
        "gray-400": "#929292",
        "gray-500": "#616161",
        "gray-800": "#1C1C1C",
        "gray-900": "#131313",
        "gray-950": "#212121",
        "gray-border": "#E0E0DF",
        "text-green": '#005C4D',
        "live": "#8F485D",
      }
    },
  },
  plugins: [],
};
export default config;
