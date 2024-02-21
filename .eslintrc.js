module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "plugin:@typescript-eslint/recommended", "plugin:import/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/type-annotation-spacing": ["warninng", { before: false, after: true, overrides: { arrow: { before: true, after: true } } }],
    "@typescript-eslint/no-unused-vars": ["warning", { argsIgnorePattern: "^_" }],
    quotes: ["warning", "single"],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
  },
};
