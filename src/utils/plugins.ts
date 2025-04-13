import { Linter } from 'eslint';

const keys = <T extends object>(value: T) => Object.keys(value) as (keyof T)[];

export const deduplicateConfigPlugins = (configs: Linter.Config[]) => {
  const plugins: string[] = [];

  return configs.map<Linter.Config>((config) => {
    return keys(config).reduce<Linter.Config>((acc, key) => {
      const value: Linter.Config[typeof key] =
        key !== 'plugins' || config.plugins === undefined
          ? config[key]
          : keys(config.plugins).reduce<typeof config.plugins>((acc, name) => {
              if (!plugins.includes(name) && config.plugins) {
                const plugin = config.plugins[name];

                acc[name] = plugin;
                plugins.push(name);
              }

              return acc;
            }, {});

      acc[key] = value as any;

      return acc;
    }, {});
  });
};
