import globals from "globals";
import tseslint from "typescript-eslint";
import * as emsconfig from "eslint-config-emarsys";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { languageOptions: { globals: globals.browser } },
  { ...emsconfig.default },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts}"],
    ignores: ["**/coverage/**/*"],
  },
];
