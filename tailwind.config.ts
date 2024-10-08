import type { Config } from "tailwindcss";

const secondary = "#F0EBE3";
const tertiary = "#F3D0D7";
const positive = "#A2D9A8";

const config: Config = {
  // https://stackoverflow.com/questions/70639657/tailwind-css-not-working-properly-in-nextjs
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#F6F5F2",
        secondary: secondary,
        tertiary: tertiary,
        "tertiary:hover": "#7c7c7c",
        quaternary: "#FFEFEF",
        loading: "#e6e6e6",
        positive,
      },
      fontSize: {
        body1: "1.25rem",
        body2: "1rem",
        body3: "0.563rem",
        heading1: "2rem",
        heading3: "1.5rem",
      },
      textColor: {
        placeholder: "#a1a8b2",
        error: "red",
      },
      borderColor: {
        income: positive,
        expense: tertiary,
        secondary,
      },
    },
  },
  plugins: [],
};
export default config;
