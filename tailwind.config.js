// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js, jsx}", "./public/index.html"],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/public/img/cover.png')"
      }
    },
  },
  plugins: [],
}
