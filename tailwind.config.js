/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Figtree', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: '#0F1B33',
        paper: '#F2F4F9',
        brand: { DEFAULT: '#2F4BFF', dark: '#2339CC', soft: '#E8EBFF' },
      },
    },
  },
  plugins: [],
};
