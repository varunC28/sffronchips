/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",   // Small phones (iPhone SE, compact Androids)
      sm: "640px",   // Large phones / small tablets
      md: "768px",   // Tablets (iPads, landscape mobile)
      lg: "1024px",  // Laptops / small desktops
      xl: "1280px",  // Large desktop monitors
      "2xl": "1536px",
    },
    extend: {
      colors: {
        sffron: {
          red: "#E5232A",       // Core brand red
          orange: "#F15A24",    // Secondary deep orange
          gold: "#FDB813",      // Accent gold / chips yellow
          dark: "#0F1016",      // Primary dark background
          card: "rgba(255, 255, 255, 0.04)",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      spacing: {
        // Safe area insets for notched iPhones & Android navigation bars
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      minHeight: {
        "screen-dynamic": "100dvh",
      },
      height: {
        "screen-dynamic": "100dvh",
      },
      fontSize: {
        // Fluid typography tokens
        "fluid-hero": "clamp(2rem, 8vw, 4.5rem)",
        "fluid-title": "clamp(1.5rem, 5vw, 3rem)",
        "fluid-subtitle": "clamp(0.95rem, 2.5vw, 1.25rem)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(229, 35, 42, 0.35)",
        "glow-gold": "0 0 35px -8px rgba(253, 184, 19, 0.3)",
      },
    },
  },
  plugins: [],
};
