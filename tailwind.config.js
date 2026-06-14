/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  
  theme: {
  extend: {
    keyframes: {
      xpFloat: {
        "0%": { opacity: "0", transform: "translateY(0px) scale(0.9)" },
        "20%": { opacity: "1", transform: "translateY(-10px) scale(1)" },
        "100%": { opacity: "0", transform: "translateY(-60px) scale(1.1)" },
      },
    },
    animation: {
      xpFloat: "xpFloat 1s ease-out forwards",
    },
  },
},

};
