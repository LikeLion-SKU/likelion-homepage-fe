import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintConfigPrettier from 'eslint-config-prettier';
import prettier from 'eslint-plugin-prettier'; // this line

export default [
  { ignores: ['dist', '.eslintrc.cjs'] }, // 무시할 패턴 설정
  {
    files: ['**/*.{js,jsx}'], // JS, JSX 파일 대상으로 설정
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: {
      react: { version: '18.2' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
      'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
      'react/jsx-no-target-blank': 'off',
      'react/prop-types': 'off',
      'react/jsx-key': [
        'error',
        { checkFragmentShorthand: true, checkKeyMustBeforeSpread: true, warnOnDuplicates: true },
      ],
      'react/jsx-no-duplicate-props': 'error',
      'react/function-component-definition': [
        'warn',
        { nameComponents: 'function-declaration', unnamedComponents: 'function-expression' },
      ],
      'react/jsx-no-useless-fragment': 'warn',
      'react/jsx-pascal-case': 'error',
      'react/jsx-fragments': ['warn', 'syntax'],
      'react/react-in-jsx-scope': 'off',
      'react/jsx-indent-props': ['warn', 2],
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  eslintConfigPrettier,
];
