module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  ignorePatterns: ["**/*[sS]pec.ts"],
  plugins: ["@typescript-eslint"],
  rules: {
    semi: [2, "always"],
    "no-console": 1,
    "no-alert": 2,
    "no-undef": "off",
    "no-empty": "off",
    "@typescript-eslint/no-var-requires": 0,
    "no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": 0,
  },
};
