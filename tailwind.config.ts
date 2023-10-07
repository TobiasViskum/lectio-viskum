import type { Config } from "tailwindcss";
const tailwindConfig: Config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        xxs: "320px",
        xs: "480px",
        short: { raw: "(max-height: 400px)" },
        desktop: { raw: "(hover: hover)" },
        touch: { raw: "(hover: none)" },
        "w-autofill": { raw: ":-webkit-autofill" },
        standalone: { raw: "(display-mode: standalone)" },
        browser: { raw: "(display-mode: browser)" },
      },
      fontSize: {
        "2xs": "0.7rem",
        "3xs": "0.675rem",
        "4xs": "0.65rem",
        "5xs": "0.6rem",
        "6xs": "0.55rem",
        "7xs": "0.5rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        "dot-flashing": {
          "0%": {
            backgroundColor: "rgb(113, 113, 122)",
          },
          "50%, 100%": {
            backgroundColor: "rgba(113, 113, 122, 0.2)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dot-flashing": "dot-flashing 1s infinite alternate",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

module.exports = tailwindConfig;
