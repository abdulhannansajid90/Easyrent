import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "on-primary": "var(--on-primary)",
        secondary: "var(--secondary)",
        "on-secondary": "var(--on-secondary)",
        surface: "var(--surface)",
        "on-surface": "var(--on-surface)",
        "surface-variant": "var(--surface-variant)",
        "on-surface-variant": "var(--on-surface-variant)",
        outline: "var(--outline)",
        "outline-variant": "var(--outline-variant)",
        "success-bg": "var(--success-bg)",
        "success-text": "var(--success-text)",
        "warning-bg": "var(--warning-bg)",
        "warning-text": "var(--warning-text)",
        "error-bg": "var(--error-bg)",
        "error-text": "var(--error-text)",
      },
      borderRadius: {
        DEFAULT: "0.25rem", // 4px
        md: "0.375rem", // 6px
        lg: "0.5rem", // 8px
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "margin-desktop": "48px",
        md: "16px",
        "margin-mobile": "24px",
        xl: "32px",
        sm: "8px",
        "2xl": "48px",
        "3xl": "64px",
        xs: "4px",
        unit: "8px",
        lg: "24px",
        gutter: "16px",
      },
      fontFamily: {
        "utility-label": ["var(--font-body)", "sans-serif"],
        "body-lg": ["var(--font-body)", "sans-serif"],
        "display-lg-mobile": ["var(--font-display)", "serif"],
        "display-md": ["var(--font-display)", "serif"],
        "headline-sm": ["var(--font-display)", "serif"],
        "display-lg": ["var(--font-display)", "serif"],
        "body-md": ["var(--font-body)", "sans-serif"],
        "utility-data": ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "utility-label": ["13px", { lineHeight: "1.4", letterSpacing: "0.02em", fontWeight: "500" }],
        "body-lg": ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        "display-lg-mobile": ["36px", { lineHeight: "1.1", fontWeight: "400" }],
        "display-md": ["32px", { lineHeight: "1.15", letterSpacing: "-0.01em", fontWeight: "400" }],
        "headline-sm": ["20px", { lineHeight: "1.3", fontWeight: "500" }],
        "display-lg": ["48px", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
        "utility-data": ["14px", { lineHeight: "1.4", fontWeight: "500" }],
      },
    },
  },
  plugins: [],
};
export default config;
