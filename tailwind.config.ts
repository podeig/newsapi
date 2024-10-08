import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      scale: {
        "102": "1.02",
      },
      image: {
        old: {
          filter: "grayscale(1) blur(1px) contrast(1.2) sepia(1)",
          "-webkit-mask": "radial-gradient(#000, #0009)",
        },
      },
    },
  },
  plugins: [],
};
export default config;
