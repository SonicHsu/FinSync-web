/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme'); 

module.exports = {
  content: ["./*.html", "./scripts-new/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}

