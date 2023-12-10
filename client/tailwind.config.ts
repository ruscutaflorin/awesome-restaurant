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
          primary: "#00bdd9",

          secondary: "#00b3ff",

          accent: "#0093ff",

          neutral: "#100000",

          "base-100": "#f5fefd",

          info: "#0066ff",

          success: "#31a800",

          warning: "#e85400",

          error: "#f50023",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
