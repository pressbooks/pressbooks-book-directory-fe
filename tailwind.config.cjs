const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './index.html',
    './public/**/*.html',
    './src/**/*.{js,vue}',
    './node_modules/flowbite/**/*.js'
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
        'pb-deep-blue': '#142c31',
        'pb-light-blue': '#ecf4f6',
        'pb-red': '#BB2026',
        'pb-dark-red': '#701317',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ]
};
