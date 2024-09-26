/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}"
  ],
  theme: {
    extend: {
      spacing: {
        '30': '7.5rem',
      },
      colors: {
        'header-blue': '#266Fe8',
        'body-blue': '#4780E0'
      },
    },
  },
  plugins: [],
}

