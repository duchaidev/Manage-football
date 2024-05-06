/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradient:
          "linear-gradient(86deg, rgba(0,80,110,0.8632703081232493) 0%, rgba(0,190,9,0.6755952380952381) 100%);",
      },
    },
  },
  plugins: [],
};
