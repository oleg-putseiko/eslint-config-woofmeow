import nextConfig from 'eslint-config-next';

export = Object.entries(nextConfig).reduce<typeof nextConfig>(
  (acc, [key, value]) => {
    switch (key) {
      /*
       * Configs `woofmeow/react` and `next` contain a specification of plugin `react`.
       *
       * When extending these configs in a flat config, duplicate specification conflicts occur.
       *
       * To prevent this, duplicate plugins are removed from next configs.
       */
      case 'plugins': {
        if (Array.isArray(value)) {
          const DUPLICATED_PLUGINS = ['react'];

          acc[key] = value.filter((name) => !DUPLICATED_PLUGINS.includes(name));
        }
        break;
      }

      /*
       * Configs `next`, `next/core-web-vitals` and `plugin:react-hooks/recommended-latest`
       * contain an extension of configs `plugin:react/recommended` and `plugin:react-hooks/recommended`.
       *
       * When extending configs `next`, `next/core-web-vitals` and `plugin:react-hooks/recommended-latest` in a flat config,
       * duplicate extension conflicts occur.
       *
       * To prevent this, duplicate extensions are removed from next configs.
       */
      case 'extends': {
        if (Array.isArray(value)) {
          const DUPLICATED_CONFIGS = [
            'plugin:react/recommended',
            'plugin:react-hooks/recommended',
          ];

          acc[key] = value.filter((name) => !DUPLICATED_CONFIGS.includes(name));
        }
        break;
      }

      case 'parser': {
        acc[key] = 'eslint-config-next/parser';
        break;
      }

      default:
        acc[key] = value;
        break;
    }

    return acc;
  },
  {},
);
