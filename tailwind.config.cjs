/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        ubuntu: ["Ubuntu Mono", "monospace"],
      },
      colors: {
        "gray-mantine-dark": "#373A40",
        "gray-mantine-light": "#25262b",
        "gray-mantine-dark-100": "#1c1c20",
      },
      screens: {
        xs: "425px",
      },
      borderRadius: {
        md: "4px",
      },
    },
  },
  plugins: [],
};
