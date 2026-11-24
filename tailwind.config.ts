import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        creme: {
          50: "#FDFBF7",
          100: "#F8F1E5",
          200: "#F2E5D3",
          300: "#EADBC8",
        },
        bege: {
          DEFAULT: "#EADBC8",
          dark: "#DECBB3",
        },
        terracota: {
          DEFAULT: "#873D1D",
          hover: "#733317",
          light: "#A44B24",
          soft: "rgba(135, 61, 29, 0.08)",
        },
        marrom: {
          DEFAULT: "#302218",
          deep: "#231710",
          light: "#4A372A",
          border: "rgba(48, 34, 24, 0.12)",
        },
        dourado: {
          DEFAULT: "#C99753",
          light: "#DFC085",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "system-ui", "sans-serif"],
      },
      lineHeight: {
        tightest: "0.95",
        tighter: "1.05",
      },
      letterSpacing: {
        editorial: "0.15em",
        subtle: "0.05em",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(48, 34, 24, 0.07)",
        card: "0 10px 30px -10px rgba(48, 34, 24, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
