// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
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
  plugins: [require("@savvywombat/tailwindcss-grid-areas")],
};
