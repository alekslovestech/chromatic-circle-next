// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        buttons: {
          bgDefault: "#e1e3e6",
          bgSelected: "#598abb",
          bgHover: "#7ba3c7",
          textDefault: "#1A1A1A",
          textSelected: "#FFFFFF",
          border: "rgba(45, 45, 45, 0.1)", // Added border style matching serenity-transparent1
          borderSelected: "rgba(45, 45, 45, 0.2)",
        },
        labels: {
          textDefault: "#1f1f1f",
        },
        keys: {
          bgWhite: "#ffffff",
          bgBlack: "#2d2d2d",
          bgSelected: "#598abb",
          bgHover: "#f0f0f0",
          bgPressed: "#d0d0d0",
        },
        /*serenity: {
          light: "#e1e3e6", //softgray (from original serenity)
          //dark: "#333333",
          dark: "#598abb", //
          textblack: "#1A1A1A",
          textwhite: "#FFFFFF",
          transparent1: "rgba(45, 45, 45, 0.1)",
          transparent2: "rgba(45, 45, 45, 0.2)",
        },*/
      },
      test: "red",
      test2: "#598abb",

      staffHeight: "100px",
      gridTemplateAreas: {
        default: [
          "staff staff staff staff",
          "circular circular settings settings",
          "linear linear settings settings",
        ],
        advanced: [
          "staff staff staff staff",
          "circular circular sidebar sidebar",
          "circular circular linear linear",
        ],
      },
    },
  },
};
