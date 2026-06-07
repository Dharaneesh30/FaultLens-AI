/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        slateblue: "#1d4ed8",
        mist: "#eff6ff",
        sand: "#f8fafc",
        ember: "#f97316",
      },
      boxShadow: {
        card: "0 20px 45px -25px rgba(17, 24, 39, 0.35)",
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["Trebuchet MS", "sans-serif"],
      },
    },
  },
  plugins: [],
};
