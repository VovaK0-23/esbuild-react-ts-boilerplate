module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:compat/recommended',
    'prettier',
  ],
  overrides: [
    {
      files: ['./*.{js,cjs}'],
      env: {
        node: true,
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'react', 'compat'],
  ignorePatterns: ['public/*'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {},
};
