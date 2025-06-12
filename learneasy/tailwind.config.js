/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        'learn-easy-green': '#00FF00', // Example green
        'learn-easy-yellow': '#FFFF00', // Example yellow
        'learn-easy-correct': '#77dd77', // A softer green for correct answers
        'learn-easy-incorrect': '#ff6961', // A soft red for incorrect
        'learn-easy-blue': '#007BFF', // A primary blue for buttons or links
        'learn-easy-dark': '#282c34', // Dark mode background
        'learn-easy-light': '#ffffff', // Light mode background
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-short': 'bounce 0.5s 3', // Example bounce animation
      }
    },
  },
  plugins: [],
}
