module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
    },
    //忽略检查某些全局变量
    globals: {
        'React': true
    },
    extends: [
        'eslint:recommended',
    ],
    parser: "babel-eslint",
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        }
    },
    rules: {
        'comma-dangle': ['error', 'always-multiline'],
        'indent': ['error', 4],
        'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'],
        'semi': ['error', 'always'],
        'no-unused-vars': ['warn'],
        'no-console': 0,
        'rest-spread-spacing': ["error", "never"]
    },
};