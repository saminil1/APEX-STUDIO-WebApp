import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        primary: "var(--color-primary)",
        "primary-light": "var(--color-primary-light)",
        "primary-dark": "var(--color-primary-dark)",
        accent: "var(--color-accent)",
        text: "var(--color-text)",
        "text-sub": "var(--color-text-sub)",
      },
      fontFamily: {
        sans: ["'Noto Sans KR'", "sans-serif"],
      },
      fontSize: {
        body: ["22px", { lineHeight: "1.6" }],
        subtitle: ["26px", { lineHeight: "1.4", fontWeight: "700" }],
        story: ["clamp(36px, 8vw, 56px)", { lineHeight: "1.2", fontWeight: "900" }],
      },
    },
  },
  plugins: [],
};
export default config;
