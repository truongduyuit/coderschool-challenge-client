/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        backgroundImage: {
          'banner': "url('/assets/images/banner.webp')",
        }
      }
    }
  },
  plugins: [],
}