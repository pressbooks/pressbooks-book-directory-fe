module.exports = {
  extends: [
    'plugin:vue/recommended'
  ],
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'object-shorthand': ['error', 'always', { 'avoidExplicitReturnArrows': true }]
  }
};