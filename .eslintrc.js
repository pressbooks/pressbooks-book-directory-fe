module.exports = {
    extends: [
        'plugin:vue/vue3-recommended'
    ],
    rules: {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "object-shorthand": ["error", "always", { "avoidExplicitReturnArrows": true }]
    }
}