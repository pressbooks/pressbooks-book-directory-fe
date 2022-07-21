const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './**/*.html',
    './public/**/*.html',
    './src/**/*.{js,vue}',
  ],
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
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ]
};
