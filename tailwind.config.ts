import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f1faf1",
          100: "#dcf2dd",
          200: "#b8e5bb",
          300: "#8ad290",
          400: "#5cba64",
          500: "#389c43",
          600: "#2a7d34",
          700: "#23632b",
          800: "#1f4f26",
          900: "#1a4121",
        },
        accent: {
          DEFAULT: "#f5820a",
          hover: "#d96f02",
          soft: "#ffa94d",
        },
        surface: {
          DEFAULT: "#ffffff",
          dark: "#10160f",
          alt: "#f6f8f6",
          "alt-dark": "#171f16",
        },
        ink: {
          DEFAULT: "#14231a",
          dark: "#eef4ee",
          soft: "#45564c",
          "soft-dark": "#c3d0c4",
          muted: "#79897f",
          "muted-dark": "#8fa190",
        },
        border: {
          DEFAULT: "#e3e9e3",
          dark: "#263026",
        },
        success: "#1f8a4c",
        danger: "#d92d20",
        warning: "#f5a623",
        info: "#2563eb",
        transit: "#7c3aed",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(20, 35, 26, 0.06)",
        md: "0 4px 12px rgba(20, 35, 26, 0.08)",
        lg: "0 12px 32px rgba(20, 35, 26, 0.14)",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        header: "64px",
        "mobile-nav": "64px",
      },
      animation: {
        "slide-up": "slide-up 0.25s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "toast-in": "toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "slide-up": {
          "0%": { transform: "translateY(12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "toast-in": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
