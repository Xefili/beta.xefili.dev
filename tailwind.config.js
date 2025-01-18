/** @type {import('tailwindcss').Config} */
const autoprefixer = require('autoprefixer');

module.exports = {
  content: ['*.html', "en//api//*.html", "de//api//*.html", "fr//api//*.html", "en//building/*.html", "de//building/*.html", "en//opensource/contribute.html", "de//opensource/contribute.html", "dashboard//index.html", "gfy//*.html"],
  theme: {
    fontFamily: {
      'circle': ['Plus Jakarta Sans', 'sans-serif'],
      'circleBold': ['Plus Jakarta Sans Extrabold', 'sans-serif'],
      'mono': ['Cascadia Code', "Ubuntu Mono", "monospace"]
    },
    extend: {
      colors: {
        light: {
          50: "#e5e7eb",
          100: "#d1d5db" //hover
        },
        darker: {
          50: "#1e1f20",
          100: "#333333" //hover
        }
      }
    },
  },
  plugins: [
    autoprefixer
  ],
}

