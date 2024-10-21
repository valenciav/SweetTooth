/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'background': {
        DEFAULT: '#FFF5E4'
      },
      'primary': {
        DEFAULT: '#806060'
      },
      'secondary': {
        DEFAULT: '#CA8787'
      },
    },
    extend: {},
  },
  plugins: [],
}

