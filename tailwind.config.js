const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: [
    './**/*.html',
    './public/**/*.html',
    './src/**/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Karmilla', ...fontFamily.sans],
        serif: ['Spectral', ...fontFamily.serif],
      },
      colors: {
        'pb-blue': '#F3F9FA',
        'pb-dark-blue': '#00243a',
        'pb-red' : '#BB2026'
      }
    },
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
};
