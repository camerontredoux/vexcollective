/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        ubuntu: ["Ubuntu Mono", "monospace"],
      },
      screens: {
        xs: "425px",
      },
    },
  },
  plugins: [],
};
