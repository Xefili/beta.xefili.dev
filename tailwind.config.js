/** @type {import('tailwindcss').Config} */
const autoprefixer = require('autoprefixer');

module.exports = {
  content: ['*.html', "en//api//*.html", "de//api//*.html", "fr//api//*.html"],
  theme: {
    fontFamily: {
      'circle': ['Plus Jakarta Sans', 'sans-serif'],
      'circleBold': ['Plus Jakarta Sans Extrabold', 'sans-serif'],
      'mono': ['Cascadia Code', "Ubuntu Mono", "monospace"]
    },
    extend: {},
  },
  plugins: [
    autoprefixer
  ],
}

