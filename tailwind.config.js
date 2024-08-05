import daisyui from 'daisyui'

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
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          'base-100': '#fafaf9',
          primary: '#F0EDCC',
          'primary-content': '#02343F',
          'base-content': '#02343F',
          accent: '#02343F',
          secondary: '#02343F',
          neutral: '#80969c'
        }
      },
      {
        dark: {
          primary: '#F0EDCC',
          'primary-content': '#02343F',
          'base-100': '#02343F',
          'base-content': '#fafaf9',
          accent: '#F0EDCC',
          secondary: '#02343F',
          neutral: '#80969c'
        }
      },
      'cupcake',
      'coffee'
    ]
  },
  darkMode: 'selector'
}
