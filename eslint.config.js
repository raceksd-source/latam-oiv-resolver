// @ts-check
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.ts', 'test/**/*.ts'],
    plugins: {
      '@typescript-eslint': tseslint,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
      },
    },
    rules: {
      // Baseline TypeScript rules (non-type-checked — fast, no tsconfig required)
      ...tseslint.configs['recommended'].rules,
      // Allow _ prefix for intentionally unused vars
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      // Dynamic imports for optional peers are intentional
      '@typescript-eslint/no-require-imports': 'error',
    },
  },
];
