/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        glock: ["Gloock", "serif"],
      },
      colors: {
        primary: "#A49966",
        secondary: "#376570",
        accent: "#C7C7A6",
        normal: "#EAFFDA",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#A49966",
          secondary: "#376570",
          accent: "#C7C7A6",
          normal: "#EAFFDA",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },
};
