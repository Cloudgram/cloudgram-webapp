import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    { ignores: ['dist', 'node_modules'] },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            ...testlint.configs.str.strictTypeChecked,
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: tseslint.ESLintParser,
            parserOptions: {
                project: './tsconfig.json',
            }
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Предупреждение о неиспользуемых переменных
            '@typescript-eslint/no-explicit-any': 'warn', // Предупреждение об использовании any
            '@typescript-eslint/explicit-function-return-type': 'warn', // Требование явного указания типов возврата функций
            'no-console': ['warn', { allow: ['warn', 'error'] }] // Разрешает только console.warn и console.error
        },
    }
)
