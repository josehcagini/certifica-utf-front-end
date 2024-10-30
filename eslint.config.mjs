import _import from "eslint-plugin-import";
import importHelpers from "eslint-plugin-import-helpers";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

const config = [{
    ignores: ["**/node_modules/", "**/.next/"],
}, ...fixupConfigRules(compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        prettier,
        import: fixupPluginRules(_import),
        react: fixupPluginRules(react),
        "import-helpers": importHelpers,
    },

    languageOptions: {
        parser: tsParser,
    },

    settings: {
        react: {
            version: "detect",
        },

        "import/resolver": {
            typescript: {
                alwaysTryTypes: true,
                project: "./tsconfig.node.json",
            },

            node: {
                paths: ["src"],
                extensions: [".js", ".jsx", ".ts", ".tsx"],
            },
        },

        "import/parsers": {
            "@typescript-eslint/parser": [".ts", ".tsx"],
        },
    },

    rules: {
        "import/no-unresolved": "off",
        "import/no-named-as-default": "off",
        "import/extensions": ["off"],
        "react/react-in-jsx-scope": "off",
        "react/props-types": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-unsafe-function-type": "off",
        "react-hooks/exhaustive-deps": "off",
        "react/prop-types": "off",
        "@typescript-eslint/no-unused-vars": "error",
        "no-unused-vars": "error",
        "no-constant-condition": "warn",
        "react/no-unescaped-entities": "off",
        "prefer-const": 2,
        "@typescript-eslint/ban-ts-comment": "off",
        "eslint no-delete-var": "off",

        "import-helpers/order-imports": ["error", {
            newlinesBetween: "always",
            groups: ["/^react/", "module", "/^@/", ["parent", "sibling", "index"], "/styles/"],

            alphabetize: {
                order: "asc",
                ignoreCase: true,
            },
        }],
    },
}];

export default config;