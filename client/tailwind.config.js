/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FFD700",    // PigeonShip Yellow
        secondary: "#1A1A1A",  // Dark Text
        surface: "#F9FAFB",    // Light Background
      },
      borderRadius: {
        'px': '8px',
      }
    },
  },
  plugins: [],
}