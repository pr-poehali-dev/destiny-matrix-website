import { fontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
        montserrat: ["Montserrat", ...fontFamily.sans],
        rubik: ["Rubik", ...fontFamily.sans],
        cinzel: ["Cinzel", "serif"],
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: {
            DEFAULT: "hsl(var(--sidebar-primary))",
            foreground: "hsl(var(--sidebar-primary-foreground))",
          },
          accent: {
            DEFAULT: "hsl(var(--sidebar-accent))",
            foreground: "hsl(var(--sidebar-accent-foreground))",
          },
        },
        destiny: {
          purple: "#9b87f5",
          darkPurple: "#7E69AB",
          vividPurple: "#8B5CF6",
          softPurple: "#D6BCFA",
          darkBg: "#1A1F2C",
          blood: "#8A0303",
          ritual: "#470259",
          shadow: "#0D0A19",
          mystic: "#3E0E62",
          occult: "#170B2E",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        ghostly: {
          "0%, 100%": { opacity: 0.3 },
          "50%": { opacity: 0.8 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 1.5s ease-in-out",
        ghostly: "ghostly 3s ease-in-out infinite",
      },
      backgroundImage: {
        pentagram: "url('/pentagram.svg')",
        "ritual-circle": "url('/ritual-circle.svg')",
        "occult-bg": "url('/bg-occult.jpg')",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".text-shadow-sm": {
          "text-shadow": "0 1px 2px var(--tw-shadow-color)",
        },
        ".text-shadow": {
          "text-shadow": "0 2px 4px var(--tw-shadow-color)",
        },
        ".text-shadow-md": {
          "text-shadow": "0 4px 8px var(--tw-shadow-color)",
        },
        ".text-shadow-lg": {
          "text-shadow": "0 8px 16px var(--tw-shadow-color)",
        },
        ".text-shadow-none": {
          "text-shadow": "none",
        },
      });
    }),
  ],
};
