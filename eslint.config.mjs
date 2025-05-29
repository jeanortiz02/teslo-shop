import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginReact from "eslint-plugin-react";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      "react/display-name": "off",

      // 👇 Reglas clave para reducir errores molestos de linting
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unused-vars": ["off", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-require-imports": "off",

      ignores: ["node_modules", "src/generated"], // 👈 asegúrate de incluir esto
    },
  },
];

export default eslintConfig;
