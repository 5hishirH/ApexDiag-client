/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tert: "#10a37f",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#1e3a8a",
          secondary: "#93c5fd",
          accent: "#99f6e4",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          info: "#ffffff",
          success: "#86efac",
          warning: "#ff704d",
          error: "#ff3300",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
