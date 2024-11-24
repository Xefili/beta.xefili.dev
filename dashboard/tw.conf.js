/** @type {import('tailwindcss').Config} */
const autoprefixer = require('autoprefixer');

module.exports = {
  content: ["dashboard//*.html"],
  theme: {
    fontFamily: {},
    extend: {},
  },
  plugins: [
    autoprefixer
  ],
}

// used for extras - do not modify!