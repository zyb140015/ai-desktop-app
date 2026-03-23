/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/renderer/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Avenir Next"', '"Segoe UI"', 'sans-serif'],
        display: ['Iowan Old Style', 'Palatino', 'Georgia', 'serif'],
      },
      boxShadow: {
        panel: '0 24px 60px rgba(48, 35, 24, 0.12)',
      },
    },
  },
  plugins: [],
}
