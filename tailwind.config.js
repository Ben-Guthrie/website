import daisyui from 'daisyui'
import defaultTheme from 'tailwindcss/defaultTheme'

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
      },
      fontFamily: {
        jaro: ['Jaro', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          'base-100': '#fafaf9',
          primary: '#F0EDCC',
          'primary-content': '#02343F',
          'base-content': '#02343F',
          secondary: '#DD8649',
          accent: '#4D4D80',
          neutral: '#80969c'
        }
      },
      {
        dark: {
          primary: '#F0EDCC',
          'primary-content': '#02343F',
          'base-100': '#02343F',
          'base-content': '#fafaf9',
          secondary: '#4D4D80',
          accent: '#DD8649',
          neutral: '#80969c'
        }
      },
      'cupcake',
      'coffee'
    ]
  },
  darkMode: 'selector'
}
