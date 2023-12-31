import type { Config } from "tailwindcss";
const tailwindConfig: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        xxs: "320px",
        xs: "480px",
      },
      minWidth: {
        "1/2": "50%",
        "1/3": "33.333333%",
        "1/4": "25%",
        "1/5": "20%",
        "1/6": "16.666667%",
      },
      fontSize: {
        "2xs": "0.7rem",
        "3xs": "0.675rem",
        "4xs": "0.65rem",
        "5xs": "0.6rem",
        "6xs": "0.55rem",
        "7xs": "0.5rem",
      },
      dropShadow: {
        "glow-sm": "[0_0_0.3rem_#ffffff70]",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        link: "hsl(var(--link))",
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
        "small-explosion": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.015)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "small-implosion": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(0.965)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "100",
          },
        },
        "fade-out": {
          "0%": {
            opacity: "100",
          },
          "100%": {
            opacity: "0",
          },
        },
        "expand-in": {
          "0%": {
            transform: "translateY(-150%)",
            opacity: "0",
          },
          "90%": {
            opacity: "10",
          },
          "100%": {
            transform: "translateY(0%)",
            opacity: "100",
          },
        },
        "schools-fade-in": {
          "0%": {
            opacity: "0",
          },
          "40%": {
            opacity: "0",
          },
          "100%": {
            opacity: "100",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "dot-flashing": "dot-flashing 1s infinite alternate",
        "small-explosion": "small-explosion 0.15s ease-out",
        "small-implosion": "small-implosion 0.15s ease-out",
        "fade-in": "fade-in 0.10s ease-in",
        "fade-out": "fade-out 0.10s ease-out",
        "expand-in": "expand-in 1.75s ease-out",
        "schools-fade-in": "schools-fade-in 1.75s ease-in",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/container-queries"),
  ],
};

module.exports = tailwindConfig;
