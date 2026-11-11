import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist', 'coverage'],
  },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn',

      // --- СУВОРІШІ ПРАВИЛА ---
      'no-console': 'error',              // Забороняє залишати console.log у коді
      'no-debugger': 'error',             // Забороняє debugger
      eqeqeq: ['error', 'always'],        // Дозволяє лише === та !==
      curly: ['error', 'all'],            // Зобов'язує використовувати фігурні дужки в if/else/for
      'no-var': 'error',                  // Забороняє var, тільки let/const
      'prefer-const': 'error',            // Вимагає const, якщо змінна не переприсвоюється
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }], // Суворіша перевірка невикористаних змінних
      'no-duplicate-imports': 'error',    // Забороняє дублювання імпортів
      'no-alert': 'error',                // Забороняє alert/confirm/prompt
    },
  },
  prettier,
]