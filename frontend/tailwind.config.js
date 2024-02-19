/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        translate: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },

        translatevol: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        volet: {
          "0%": { opacity: 0, transform: "translateY(-20%)" },
          "100%": { opacity: 1, transform: "translateY(0%)" },
        },
      },
      animation: {
        trans: "translate 0.6s ease forwards",
        vol: "volet 0.6s ease forwards",
        transvolet: "translatevol 0.6s ease forwards",
      },
      fontSize: {
        xxs: "0.65rem",
      },
    },
  },
  plugins: [],
};
