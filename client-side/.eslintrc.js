module.exports = {
  rules: {
    "no-console": "error",
    "import/first": "error",
    "react/prop-types": "off",
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  root: true,
  plugins: ["react", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: 11,
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.json",
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect",
    },
  },
};
