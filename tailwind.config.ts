import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#F6F5F2',
        'secondary': '#F0EBE3',
        'tertiary': '#F3D0D7',
        'tertiary:hover': '#7c7c7c',
        'quaternary': '#FFEFEF',
      },
      fontSize: {
        'body3': '0.563rem',
        'heading3': '1.5rem',
      }
    },
  },
  plugins: [],
};
export default config;
