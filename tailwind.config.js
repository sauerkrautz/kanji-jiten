/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        first: "#06142E",
        second: "#1B3358",
        third: "#473E66",
        fourth: "#BD83B8",
        fifth: "#F5D7DB",
        sixth: "#F1916D",
      },
    },
  },
  plugins: [],
};
