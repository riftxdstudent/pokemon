/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },

  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#7d52f2",
          "secondary": "#22cc96",
          "accent": "#d2ed93",
          "neutral": "#1b1b22",
          "base-100": "#233143",
          "info": "#4daed1",
          "success": "#11835f",
          "warning": "#ee982f",
          "error": "#f02836",
        },
      },
    ],
  },

  plugins: [require("daisyui")],

  
}

