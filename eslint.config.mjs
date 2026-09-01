import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
  // Override default ignores of eslint-config-next.
    globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    ]),
    {
    rules: {
        'camelcase': ['error'],
        'func-style': ['error'],
        'no-var': ['error'],
        'prefer-const': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
            argsIgnorePattern: '^_',
            },
        ],
    }
    },
    eslintConfigPrettier,
]);

export default eslintConfig;