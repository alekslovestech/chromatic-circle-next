// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        test: "red",
        serenity: {
          light: "#f7f8fa",
          dark: "#333333",
          textblack: "#1A1A1A",
          textwhite: "#FFFFFF",
          transparent1: "rgba(45, 45, 45, 0.1)",
          transparent2: "rgba(45, 45, 45, 0.2)",
        },
      },
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
