// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  safelist: [
    // Force these classes to be generated
    "bg-test",
    {
      pattern: /bg-keys-*/,
    },
    {
      pattern: /fill-keys-*/,
    },
    {
      pattern: /text-keys-*/,
    },
    {
      pattern: /border-keys-*/,
    },
    {
      pattern: /border-containers-border*/,
    },
    // Add playback button colors to safelist
    {
      pattern: /text-playback-*/,
    },
  ],
  theme: {
    extend: {
      colors: {
        test: "red",
        test2: "#598abb",

        buttons: {
          bgDefault: "rgb(225, 227, 230)", //"#e1e3e6",
          bgSelected: "rgb(99, 132, 165)", //"#598abb",
          bgHover: "rgba(99, 132, 165, 0.3)",
          textDefault: "rgb(26, 26, 26)", //"#1A1A1A",
          textSelected: "rgb(255, 255, 255)", //"#ffffff",
          border: "rgba(45, 45, 45, 0.1)", // Added border style matching serenity-transparent1
          borderSelected: "rgba(192, 42, 42, 0.2)",
          bgDisabled: "rgb(229, 231, 235)", // #e5e7eb - Tailwind gray-200

          // New action button colors
          actionBgDefault: "rgb(240, 242, 245)", // Slightly lighter, more "pressable"
          actionBgHover: "rgb(220, 225, 230)", // Darker on hover for press effect
          actionBgActive: "rgb(200, 210, 220)", // Even darker when actively pressed
          actionBorder: "rgba(60, 60, 60, 0.2)", // Stronger border for definition
          actionText: "rgb(50, 50, 50)", // Slightly different text color
        },

        // New playback button colors
        playback: {
          scalesMode: "rgb(37, 99, 235)", // blue-600
          defaultMode: "rgb(16, 185, 129)", // emerald-500
        },

        labels: {
          textDefault: "rgb(31, 31, 31)", //"#1f1f1f",
        },
        keys: {
          bgWhite: "rgb(250, 250, 246)", //"#fafaf6",
          bgBlack: "rgb(68, 68, 68)", //"#444444",
          bgWhiteSelected: "rgb(168, 213, 226)", //"#A8D5E2",
          bgBlackSelected: "rgb(107, 170, 204)", //"#6BB4C7",
          textOnWhite: "rgb(51, 51, 51)", //"#333333",
          textOnBlack: "rgb(245, 245, 245)", //"#F5F5F5",
          bgHover: "rgb(240, 240, 240)", //"#f0f0f0",
          borderColor: "rgb(110, 110, 110)", //"#6E6E6E",

          bgHighlighted: "rgb(113, 182, 255)", //"#B0D6FD",
          bgHighlightedSelected: "rgb(59, 97, 222)", //"#3B61DE",
          textOnHighlighted: "rgb(68, 68, 68)", //"#444444",

          bgMuted: "rgb(228, 229, 230)", //"#E4E5E6",
          bgMutedSelected: "rgb(150, 150, 150)", //"#969696",
          textOnMuted: "rgb(51, 51, 51)", //"#333333",

          bgRootNote: "rgb(222, 97, 59)", //"#DE613B",

          borderRootNote: "rgb(255, 0, 0)", //"#6E6E6E",
          scaleBoundaryColor: "rgb(60, 60, 60)", //"#3C3C3C",
        },
        containers: {
          border: "rgba(0,0, 128, 0.05)", // Default container border
          borderDebug: "rgba(0,0,0, 0.8)", // Default container border
        },
        canvas: {
          bgDefault: "rgb(247, 248, 250)", //"#F7F8FA",
          bgScales: "rgb(220, 220, 220)", //"#F0F2F5",
        },
      },
      spacing: {
        //used for gaps and margins
        tight: "0.25rem",
        snug: "0.5rem",
        normal: "1rem",
        loose: "1.25rem",
        spacious: "1.5rem",
      },
      minWidth: {
        "button-sm": "1.75rem",
        "button-md": "2.25rem",
        "button-lg": "2.75rem",
      },
    },
  },
};
