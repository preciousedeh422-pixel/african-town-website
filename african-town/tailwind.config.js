/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0A08',
        charcoal: '#17140F',
        ivory: '#F4EEE2',
        cream: '#EAE0CB',
        gold: '#C6A15B',
        'gold-soft': '#D9BE8C',
        terracotta: '#B5563B',
        clay: '#7A2E22',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
