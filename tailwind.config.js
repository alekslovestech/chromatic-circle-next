// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        buttons: {
          bgDefault: "rgb(225, 227, 230)", //"#e1e3e6",
          bgSelected: "rgb(99, 132, 165)", //"#598abb",
          bgHover: "rgba(99, 132, 165, 0.3)",
          textDefault: "rgb(26, 26, 26)", //"#1A1A1A",
          textSelected: "rgb(255, 255, 255)", //"#ffffff",
          border: "rgba(45, 45, 45, 0.1)", // Added border style matching serenity-transparent1
          borderSelected: "rgba(192, 42, 42, 0.2)",
          bgDisabled: "rgb(229, 231, 235)", // #e5e7eb - Tailwind gray-200
        },
        labels: {
          textDefault: "rgb(31, 31, 31)", //"#1f1f1f",
        },
        keys: {
          bgWhite: "rgb(255, 255, 255)", //"#ffffff",
          bgBlack: "rgb(45, 45, 45)", //"#2d2d2d",
          bgSelected: "rgb(99, 132, 165)", //"#598abb",
          bgHover: "rgb(240, 240, 240)", //"#f0f0f0",
          bgPressed: "rgb(208, 208, 208)", //"#d0d0d0",
        },
        containers: {
          border: "rgba(0,0,0, 0.1)", // Default container border
          borderDebug: "rgba(0,0,0, 0.4)", // Default container border
        },
        canvas: {
          bgDefault: "rgb(247, 248, 250)", //"#F7F8FA",
          bgAdvanced: "rgb(107, 114, 128)", //"#6B7280",
        },
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
