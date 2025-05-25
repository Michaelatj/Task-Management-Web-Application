/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)", // atau warna lain sesuai kebutuhanmu
        foreground: "hsl(222.2 84% 4.9%)",
        border: "hsl(240, 5%, 90%)",
      },
    },
  },
  plugins: [],
};
