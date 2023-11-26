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
          primary: "#3498db",
          secondary: "#2ecc71",
          accent: "#95a5a6",
          neutral: "#bdc3c7",
          "base-100": "#ecf0f1",
          info: "#bdc3c7",
          success: "#86efac",
          warning: "#ff704d",
          error: "#e74c3c",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
