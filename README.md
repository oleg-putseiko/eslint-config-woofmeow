<div align="center">

# 🔨🐶🐱🔧<br/><br/>WoofMeow ESLint config

[![Latest Release](https://badgen.net/github/release/oleg-putseiko/eslint-config-woofmeow?icon=github&cache=240)](https://github.com/oleg-putseiko/eslint-config-woofmeow/releases)
[![Latest Release](https://badgen.net/npm/dt/eslint-config-woofmeow?icon=npm&cache=240)](https://www.npmjs.com/package/eslint-config-woofmeow)
[![Latest Release](https://badgen.net/npm/license/eslint-config-woofmeow?color=black&cache=240)](./LICENSE.md)

</div>

ESLint configuration package for various project. You can use ready-made configuration presets or build your own based on them.

**Table of contents:**

- [Getting started](#getting-started)
- [Usage](#usage)
  - [Default preset](#default-preset)
  - [General preset](#general-preset)
  - [Base import preset](#base-import-preset)
  - [Import preset for Atomic Design](#import-preset-for-atomic-design)
  - [Import preset for Feature Sliced Design](#import-preset-for-feature-sliced-design)
  - [TypeScript preset](#typescript-preset)
  - [React preset](#react-preset)
  - [Next.js preset](#nextjs-preset)
  - [Combination of presets](#combination-of-presets)

## Getting started

Install `eslint-config-woofmeow` to your repository as dev dependency:

```bash
npm install eslint-config-woofmeow --save-dev

pnpm install eslint-config-woofmeow --save-dev

yarn add eslint-config-woofmeow --dev
```

WoofMeow ESLint configuration has the following required peer dependencies:

- [eslint](https://github.com/eslint/eslint)

> If you are using npm version 7 or higher, these dependencies will be installed automatically. Otherwise, you need to do it manually.

## Usage

### Default preset

Includes the following presets:

- [General preset](#general-preset)
- [Base import preset](#base-import-preset)

To include this preset in your ESLint configuration add `eslint-config-woofmeow` as extension:

```js
module.exports = {
  extends: 'woofmeow',
};
```

### General preset

✔️ Included in `eslint-config-woofmeow`

This preset includes general non-specific configuration.

Required peer dependencies:

- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

To include this preset in your ESLint configuration add `eslint-config-woofmeow/general` as extension:

```js
module.exports = {
  extends: 'woofmeow',
};
```

### Base import preset

✔️ Included in `eslint-config-woofmeow`

Required peer dependencies:

- [eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort)
- [eslint-plugin-unused-imports](https://github.com/sweepline/eslint-plugin-unused-imports)

To include this preset in your ESLint configuration add `eslint-config-woofmeow/import` as extension:

```js
module.exports = {
  extends: ['woofmeow', 'woofmeow/import'],
};
```

### Import preset for Atomic Design

⚠️ Not included in `eslint-config-woofmeow`

Includes the following presets:

- [Base import preset](#base-import-preset)

To include this preset in your ESLint configuration add `eslint-config-woofmeow/import-atomic` as extension:

```js
module.exports = {
  extends: ['woofmeow', 'woofmeow/import-atomic'],
};
```

### Import preset for Feature Sliced Design

⚠️ Not included in `eslint-config-woofmeow`

Related to [Feature Sliced Design](https://feature-sliced.design/) up to v2.0.0.

Includes the following presets:

- [Base import preset](#base-import-preset)

To include this preset in your ESLint configuration add `eslint-config-woofmeow/import-fsd` as extension:

```js
module.exports = {
  extends: ['woofmeow', 'woofmeow/import-fsd'],
};
```

### TypeScript preset

⚠️ Not included in `eslint-config-woofmeow`

This preset includes TypeScript ESLint configuration.

Required peer dependencies:

- [typescript](https://github.com/Microsoft/TypeScript)
- [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/eslint-plugin)
- [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser)

> If you are using npm version 7 or higher, these dependencies will be installed automatically. Otherwise, you need to do it manually.

To include this preset in your ESLint configuration add `eslint-config-woofmeow/typescript` as extension and configure parser options:

```js
module.exports = {
  extends: ['woofmeow', 'woofmeow/typescript'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
```

### React preset

⚠️ Not included in `eslint-config-woofmeow`

Required peer dependencies:

- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)

> If you are using npm version 7 or higher, these dependencies will be installed automatically. Otherwise, you need to do it manually.

To include this preset in your ESLint configuration add `eslint-config-woofmeow/react` as extension:

```js
module.exports = {
  extends: ['woofmeow', 'woofmeow/react'],
};
```

### Next.js preset

⚠️ Not included in `eslint-config-woofmeow`

Includes the following presets:

- [React preset](#react-preset)

Required peer dependencies:

- [eslint-config-next](https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-config)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) (from [React preset](./presets/react.js))
- [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks) (from [React preset](./presets/react.js))

> If you are using npm version 7 or higher, these dependencies will be installed automatically. Otherwise, you need to do it manually.

To include this preset in your ESLint configuration add `eslint-config-woofmeow/next` as extension:

```js
module.exports = {
  extends: ['woofmeow', 'woofmeow/next'],
};
```

### Combination of presets

You can combine presets to create your own ESLint configuration.

For example, to create an ESLint configuration for a project using React, TypeScript and Feature Sliced Design you need to add `eslint-config-woofmeow/react`, `eslint-config-woofmeow/typescript` and `eslint-config-woofmeow/import-fsd` to your ESLint configuration file as extensions:

```js
module.exports = {
  extends: [
    'woofmeow',
    'woofmeow/react',
    'woofmeow/typescript',
    'woofmeow/import-fsd',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
```
