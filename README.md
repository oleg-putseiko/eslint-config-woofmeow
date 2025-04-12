<div align="center">

<img src="./public/logo.png" alt="WoofMeow ESLint config logo" width="250px" />

<br/>

# WoofMeow ESLint config

[![Latest Release](https://badgen.net/github/release/oleg-putseiko/eslint-config-woofmeow?icon=github&cache=240)](https://github.com/oleg-putseiko/eslint-config-woofmeow/releases)
[![Latest Release](https://badgen.net/npm/dt/eslint-config-woofmeow?icon=npm&cache=240)](https://www.npmjs.com/package/eslint-config-woofmeow)
[![Latest Release](https://badgen.net/npm/license/eslint-config-woofmeow?color=black&cache=240)](./LICENSE.md)

</div>

ESLint configuration containing multiple presets for different projects.

**Table of contents:**

- [Getting started](#getting-started)
- [Usage](#usage)
  - [Base preset](#base-preset)
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

# or
pnpm install eslint-config-woofmeow --save-dev

# or
yarn add eslint-config-woofmeow --dev
```

## Usage

### Base preset

This preset includes a basic non-specific configuration compatible with most projects.

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.base];
```

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/base-legacy',
};
```

### Base import preset

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.import];
```

> Includes the preset `base`

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/import-legacy',
};
```

> Includes the preset `base-legacy`

### Import preset for Atomic Design

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.['import-atomic']];
```

> Includes presets `base` and `import`

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/import-atomic-legacy',
};
```

> Includes presets `base-legacy` and `import-legacy`

### Import preset for Feature Sliced Design

Related to [Feature Sliced Design](https://feature-sliced.design/) up to v2.x.x.

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.['import-fsd']];
```

> Includes presets `base` and `import`

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/import-fsd-legacy',
};
```

> Includes presets `base-legacy` and `import-legacy`

### TypeScript preset

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.typescript];
```

> Includes the preset `base`

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/typescript-legacy',
};
```

> Includes the preset `base-legacy`

### React preset

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.react];
```

> Includes the preset `base`

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/react-legacy',
};
```

> Includes the preset `base-legacy`

### Next.js preset

To include this preset in your ESLint configuration, add it as an extension:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [...configs.next];
```

> Includes presets `base` and `react`

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: 'woofmeow/next-legacy',
};
```

> Includes presets `base-legacy` and `react-legacy`

### Combination of presets

You can combine presets to create your own ESLint configuration.

For example, to create an ESLint configuration for a project using Next.js, TypeScript and Feature Sliced Design you need to add the following presets to your ESLint configuration:

```js
/* eslint.config.js */

import configs from 'eslint-config-woofmeow/flat';

export default [
  ...configs.next,
  ...configs.typescript,
  ...configs['import-fsd'],
];
```

Or the same for the eslintrc format:

```js
/* .eslintrc.js */

module.exports = {
  extends: [
    'woofmeow/next-legacy',
    'woofmeow/typescript-legacy',
    'woofmeow/import-fsd-legacy',
  ],
};
```
