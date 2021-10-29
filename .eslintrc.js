/** @type {import('@types/eslint').Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: false
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:security-node/recommended'
  ],
  ignorePatterns: [
    '**/*.test.ts',
    '**/*.spec.ts',
    'scripts/**/*',
    '**/dist/**/*',
    '**/*.js'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint',
    'security-node',
    'eslint-plugin-tsdoc'
  ],
  rules: {
    indent: [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    quotes: [
      'error',
      'single'
    ],
    semi: [
      'error',
      'never'
    ],
    'tsdoc/syntax': 'warn'
  }
}
