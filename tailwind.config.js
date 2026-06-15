/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0e27",
          card: "#111d3b",
          border: "#1a2f5a",
          text: "#e0e6ff",
        },
        neon: {
          green: "#00ff88",
          blue: "#00d4ff",
          purple: "#a78bfa",
          pink: "#ff006e",
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "slide-in": "slide-in 0.3s ease-out",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { "box-shadow": "0 0 20px rgba(0, 255, 136, 0.3)" },
          "50%": { "box-shadow": "0 0 40px rgba(0, 255, 136, 0.6)" },
        },
        "slide-in": {
          "from": { "opacity": "0", "transform": "translateY(-10px)" },
          "to": { "opacity": "1", "transform": "translateY(0)" },
        },
      },
      boxShadow: {
        "neon-glow": "0 0 20px rgba(0, 255, 136, 0.5), inset 0 0 20px rgba(0, 255, 136, 0.1)",
        "neon-blue": "0 0 20px rgba(0, 212, 255, 0.5), inset 0 0 20px rgba(0, 212, 255, 0.1)",
      },
    },
  },
  plugins: [],
}
