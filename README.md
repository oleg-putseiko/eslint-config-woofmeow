<div align="center">

<img src="./public/logo.png" alt="WoofMeow ESLint config logo" width="250px" style="padding: 50px 0"/>

# WoofMeow ESLint config

[![Latest Release](https://badgen.net/github/release/oleg-putseiko/eslint-config-woofmeow?icon=github&cache=240)](https://github.com/oleg-putseiko/eslint-config-woofmeow/releases)
[![Downloads](https://badgen.net/npm/dt/eslint-config-woofmeow?icon=npm&cache=240)](https://www.npmjs.com/package/eslint-config-woofmeow)
[![License](https://badgen.net/npm/license/eslint-config-woofmeow?color=black&cache=240)](./LICENSE.md)

</div>

A modular ESLint Flat Config containing multiple configurations for modern JavaScript and TypeScript projects.

**Table of contents:**

- [Getting started](#-getting-started)
- [How it works](#️-how-it-works)
- [Available Configs](#-available-configs)
  - [Core Configs](#core-configs)
  - [Frameworks](#frameworks)
  - [Styling](#styling)
  - [Architecture & Imports](#architecture--imports)
  - [Data & Configuration](#data--configuration)
- [Usage Examples](#-usage-examples)
  - [Using the configure function (Recommended)](#using-the-configure-function-recommended)
  - [Manual Composition (Without configure)](#manual-composition-without-configure)
- [Included Plugins (Out of the box)](#-included-plugins-out-of-the-box)

## 🚀 Getting started

Install `eslint-config-woofmeow` as a dev dependency.
_Note: This package requires `eslint >= 9.0.0` as a peer dependency._

```bash
npm install eslint-config-woofmeow --save-dev
# or
pnpm install eslint-config-woofmeow --save-dev
# or
yarn add eslint-config-woofmeow --dev
```

> **💡 Tip: File Extensions**
> ESLint Flat Config requires ES Modules (`import`/`export`). If your project does not have `"type": "module"` in its `package.json`, name your configuration file `eslint.config.mjs` instead of `eslint.config.js` to avoid module errors.

## ⚙️ How it works

This package exports a `configs` object containing all available configurations, and an optional smart `configure` helper function.

When using the `configure` function, it automatically injects the `recommended` configuration at the very beginning of the array. This ensures that fundamental rules (like base JS rules and strict core plugins) are always applied in the correct order without duplication.

## 🧩 Available Configs

You can mix and match the following configs from the `configs` object to suit your stack:

### Core Configs

- **`recommended`**: The foundation. A configuration compatible with most projects, including best practices and `unicorn` rules. _(Injected automatically if you use the `configure` helper)_.
- **`typescript`**: Specific rules and parser settings for projects using TypeScript.

### Frameworks

- **`react`**: Configuration for React projects (Hooks, JSX accessibility, etc.).
- **`next`**: Specific configuration for Next.js projects. _> Includes the `react` config._

### Styling

- **`tailwind`**: Enforces class sorting and best practices using `eslint-plugin-tailwindcss`.

### Architecture & Imports

- **`import/base`**: Basic import configuration (sorting, removing unused imports).
- **`import/atomic`**: Specific configuration for Atomic Design architecture. _> Includes the `import/base` config._
- **`import/fsd`**: Specific configuration for [Feature-Sliced Design](https://feature-sliced.design/) (up to v2.x.x). _> Includes the `import/base` config._

### Data & Configuration

- **`json`**: Configuration for `.json`, `.jsonc` (like `tsconfig.json` or `.vscode/settings.json`), and `.json5` files. It applies the appropriate parser and safely validates editor settings without breaking your JavaScript rules.

## 📖 Usage Examples

### Using the configure function (Recommended)

You can combine any number of configs to create a robust configuration. The `recommended` config is applied automatically. You can also easily override specific rules (like those from `unicorn`) by appending your own configuration object at the end.

```javascript
// eslint.config.js
import { configure, configs } from 'eslint-config-woofmeow';

export default configure(
  configs.next,
  configs.typescript,
  configs.tailwind,
  configs['import/fsd'],

  // Custom overrides (optional)
  {
    rules: {
      'no-console': 'warn',
      // Override a default unicorn rule if it's too strict for your project
      'unicorn/prefer-string-slice': 'off',
    },
  },
);
```

### Manual Composition (Without configure)

If you prefer full control over the array structure, you can bypass the `configure` helper and manually spread the configs.
**Note:** When doing this, you _must_ explicitly include `configs.recommended` if you want the base rules applied.

```javascript
// eslint.config.js
import { configs } from 'eslint-config-woofmeow';

export default [
  ...configs.recommended,
  ...configs.typescript,
  ...configs.react,

  {
    rules: {
      'no-console': 'warn',
    },
  },
];
```

## 📦 Included Plugins (Out of the box)

You do **not** need to install these plugins separately; they are already bundled and managed by this configuration:

- **Core:** `@eslint/js`, `eslint-plugin-unicorn`
- **TypeScript:** `typescript-eslint`
- **React & Next.js:** `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-config-next`
- **Imports Management:** `eslint-plugin-import`, `eslint-plugin-simple-import-sort`, `eslint-plugin-unused-imports`, `eslint-plugin-no-relative-import-paths`
- **Architecture:** `eslint-plugin-import-fsd`
- **Styling:** `eslint-plugin-tailwindcss`
- **Data & Config:** `eslint-plugin-jsonc`
