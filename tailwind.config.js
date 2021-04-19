module.exports = {
  mode: 'jit',
  purge: [
    './public/**/*.html',
    './src/**/*.{js,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        headings: ['Karmilla', 'sans-serif'],
        pbBold: ['Karmilla', 'sans-serif'],
        pbRegular: ['Spectral', 'sans-serif'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
