/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        dark: '#02343F',
        highlight: '#F0EDCC',
        light: '#fafaf9',
        semidark: '#80969c'
      }
    }
  },
  darkMode: 'selector',
  plugins: []
}
