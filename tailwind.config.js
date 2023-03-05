/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        glock: ["Gloock", "serif"],
      },
      colors: {
        primary: "#A3C9D3",
        secondary: "#376570",
        accent: "#57A4D2",
        words: "#5C5354",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A3C9D3",
          secondary: "#376570",
          accent: "#57A4D2",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },
};
