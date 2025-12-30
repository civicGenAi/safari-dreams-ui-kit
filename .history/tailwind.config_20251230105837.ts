import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      /* ---------------- FONTS ---------------- */
      fontFamily: {
        display: ["Cormorant Garamond", "Playfair Display", "Georgia", "serif"],
        heading: ["Poppins", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        luxury: ["Cormorant Garamond", "Georgia", "serif"],
        script: ["Allura", "cursive"],
      },

      /* ---------------- COLORS ---------------- */
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
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },

        /* Brand colors */
        orange: "hsl(var(--orange))",
        "orange-light": "hsl(var(--orange-light))",
        "orange-dark": "hsl(var(--orange-dark))",
        black: "hsl(var(--black))",
        cream: "hsl(var(--cream))",
        charcoal: "hsl(var(--charcoal))",
        sand: "hsl(var(--sand))",
        "warm-white": "hsl(var(--warm-white))",

        /* Loading scene colors (from first config) */
        loading: {
          dark: "hsl(var(--loading-dark))",
          medium: "hsl(var(--loading-medium))",
          light: "hsl(var(--loading-light))",
          sun: "hsl(var(--loading-sun))",
          "sun-glow": "hsl(var(--loading-sun-glow))",
          accent: "hsl(var(--loading-accent))",
          ring: "hsl(var(--loading-ring))",
          firefly: "hsl(var(--loading-firefly))",
          "mountain-far": "hsl(var(--loading-mountain-far))",
          "mountain-mid": "hsl(var(--loading-mountain-mid))",
          ground: "hsl(var(--loading-ground))",
          tree: "hsl(var(--loading-tree))",
          animal: "hsl(var(--loading-animal))",
        },
      },

      /* ---------------- BORDER RADIUS ---------------- */
      borderRadius: {
        sm: "calc(var(--radius) - 4px)",
        md: "calc(var(--radius) - 2px)",
        lg: "var(--radius)",
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },

      /* ---------------- SHADOWS ---------------- */
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        primary: "var(--shadow-primary)",
        lift: "var(--shadow-lift)",
      },

      /* ---------------- BACKGROUNDS ---------------- */
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-dark": "var(--gradient-dark)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
      },

      /* ---------------- SPACING ---------------- */
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },

      /* ---------------- FONT SIZES ---------------- */
      fontSize: {
        "2xs": "0.625rem",
        "display-lg": ["5rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        display: ["4rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        "display-sm": ["3rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
      },

      /* ---------------- TRANSITIONS ---------------- */
      transitionDuration: {
        400: "400ms",
        600: "600ms",
        800: "800ms",
      },

      /* ---------------- ANIMATIONS ---------------- */
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-in-right": "slide-in-right 0.4s ease-out",
        "slide-in-left": "slide-in-left 0.4s ease-out",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
