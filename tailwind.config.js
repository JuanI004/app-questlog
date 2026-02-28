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
      },
      animation: {
        "fade-in-down": "fadeInDown 0.3s ease-out forwards",
      },
    },
  },
  plugins: [],
};
