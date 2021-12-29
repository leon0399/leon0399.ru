module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E81E62',
          '50': '#fef4f7',
          '100': '#fde9ef',
          '200': '#f9c7d8',
          '300': '#f6a5c0',
          '400': '#ef6291',
          '500': '#e81e62',
          '600': '#d11b58',
          '700': '#ae174a',
          '800': '#8b123b',
          '900': '#720f30',
        },
      },
      container: {
        padding: '1rem',
      },
    },
  },
  plugins: [],
}