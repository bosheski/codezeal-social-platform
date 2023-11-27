module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  root: true,
  rules: {
    "prettier/prettier": 2,
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-misused-promises": "warn",
  },
};
