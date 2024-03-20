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
      colors: {
        "prussian-blue": "#001e2f",
        "columbia-blue": "#c7ebff",
        "robin-blue": "#19dce3",
        "midnight-green": "#002d2f",
        "aqua-green": "#4cf5b7",
        "celeste-green": "#c5fff3",
        "indigo-blue": "#002B44",
        "prussian-blue-light": "#042b40",
        "midnight-green-light": "#033c40",
      },
      fontFamily: {
        "montserrat": ["Montserrat", "sans"],
      },
    },
  },
  plugins: [],
};
export default config;
