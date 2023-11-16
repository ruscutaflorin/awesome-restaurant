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
          primary: "#a500ff",

          secondary: "#e58400",

          accent: "#ff8700",

          neutral: "#1e2110",

          "base-100": "#f8ffff",

          info: "#00a6ff",

          success: "#00b221",

          warning: "#ffc600",

          error: "#ff7374",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
