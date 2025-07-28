import js from '@eslint/js';
import globals from 'globals';
import airbnb from 'eslint-config-airbnb-base';

export default [
  js.configs.recommended,

  ...airbnb,

  {
    files: ['src/**/*.js', 'src/**/*.test.js'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser, 
        ...globals.es2021,
        ...globals.jest,   
      },
    },

    rules: {
      'no-console': 'off',
      'import/extensions': 'off',
      'semi': ['warn', 'always'],
      'quotes': ['warn', 'single'],
    },
  },
];