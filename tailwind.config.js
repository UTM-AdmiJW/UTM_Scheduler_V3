/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#81163f',
        secondary: '#9d2281',
      }
    },
  },
  plugins: [],
  important: true,
}
