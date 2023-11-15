import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    // base: false,
    themes: [
      {
        mytheme: {
          primary: "#0000ff",

          secondary: "#90aa00",

          accent: "#00d100",

          neutral: "#2e1d2f",

          "base-100": "#292929",

          info: "#27eaff",

          success: "#00ec75",

          warning: "#ffbe00",

          error: "#ff005b",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
