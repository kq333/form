module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'react-refresh', "prettier"],
  rules: {
    'react/jsx-max-props-per-line': [1, { maximum: 1 }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    "prettier/prettier": ["error", {
      "printWidth": 80,
      "breakProperties": true
    }]
  },
};