/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        germania: ["var(--font-germania)"],
        vend: ["var(--font-vendsans)"],
      },
      keyframes: {
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateX(-50%) translateY(-16px)",
          },
          "100%": { opacity: "1", transform: "translateX(-50%) translateY(0)" },
        },
        pulso: {
          "0%, 100%": { boxShadow: "0 0 8px var(--glow-color)" },
          "50%": {
            boxShadow: "0 0 24px var(--glow-color), 0 0 40px var(--glow-color)",
          },
        },
        giro: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-in-down": "fadeInDown 0.3s ease-out forwards",
        pulso: "pulso 2s ease-in-out infinite",
        giro: "giro 3s linear infinite",
      },
    },
  },
  plugins: [],
};
