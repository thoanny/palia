/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js}",
  ],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#2a374d",
          "secondary": "#394c6a",
          "accent": "#fcea5d",
          "neutral": "#fcebd2",
          "base-100": "#15142d",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",

          "--rounded-btn": "9999px",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

