/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // that is animation class
      animation: {
        fadeIn: 'fadeIn 0.15s ',
        fadeOut: 'fadeOut 0.15s ',
      },
      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '60%': { opacity: 0 },
        },
      }),
    },
  },
  plugins: [],
}

