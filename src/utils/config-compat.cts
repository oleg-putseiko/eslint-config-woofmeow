import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { Linter } from 'eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

enum Compatibility {
  ESLINTRC,
}

type Config = {
  readonly rules: Readonly<Linter.RulesRecord>;
};

type ConfigCompatOptions = {
  fileUrl: string;
};

type FlatCompatOptions = {
  baseDirectory: string;
  resolvePluginsRelativeTo: string;
  recommendedConfig: Config;
  allConfig: Config;
};

type ESLintrcConfigOptions = {
  flatConfig: Linter.Config[];
  extends?: string[];
};

const isPathRelative = (path: string) => /\.{1,2}\//.test(path);

const createConfigResolver = (baseDirectory: string) => (config: string) =>
  isPathRelative(config) ? path.resolve(baseDirectory, config) : config;

export class ConfigCompat extends FlatCompat {
  private _baseDirectory?: string;

  constructor(options?: ConfigCompatOptions) {
    const filename = options?.fileUrl
      ? fileURLToPath(`file:${options.fileUrl}`)
      : undefined;
    const baseDirectory = filename ? path.dirname(filename) : undefined;

    super({
      baseDirectory,
      recommendedConfig: js.configs.recommended,
      allConfig: js.configs.all,
    } as FlatCompatOptions);

    this._baseDirectory = baseDirectory;
  }

  toFlat(...configs: string[]) {
    return super.extends(...configs);
  }

  toEslintrc(options: ESLintrcConfigOptions): Linter.LegacyConfig {
    const { flatConfig } = options;

    const compatibleConfig = this._findCompatibleConfig(
      flatConfig,
      Compatibility.ESLINTRC,
    );

    if (!compatibleConfig) {
      throw new Error(
        'No compatible configurations found with eslintrc format',
      );
    }

    const {
      plugins,
      processor,
      languageOptions,
      settings,
      files,
      ignores,
      ...baseConfigProps
    } = compatibleConfig;

    const baseConfig: Linter.BaseConfig = {
      ...baseConfigProps,
      globals: languageOptions?.globals,
      parser: languageOptions?.parser?.meta?.name,
      parserOptions: languageOptions?.parserOptions,
      processor:
        typeof processor === 'object' ? processor.meta?.name : processor,
      plugins: plugins !== undefined ? Object.keys(plugins) : undefined,
      settings,
    };

    const peerProps: Linter.LegacyConfig = {
      extends: options?.extends?.map(
        createConfigResolver(this._baseDirectory ?? './'),
      ),
      ignorePatterns: ignores,
    };

    if (files !== undefined) {
      return {
        ...peerProps,
        overrides: [{ ...baseConfig, files: files.flat() }],
      };
    }

    return { ...baseConfig, ...peerProps };
  }

  excludePlugins<TConfig extends Linter.Config | Linter.LegacyConfig>(
    config: TConfig,
    pluginsToBeExcluded: string[],
  ): TConfig {
    const { plugins, ...delegatedConfig } = config;

    if (plugins === undefined) return config;

    if (Array.isArray(plugins)) {
      return {
        ...delegatedConfig,
        plugins: plugins.filter(
          (plugin) => !pluginsToBeExcluded.includes(plugin),
        ),
      } as TConfig;
    }

    return {
      ...delegatedConfig,
      plugins: Object.entries(plugins).reduce(
        (acc, [key, value]) =>
          pluginsToBeExcluded.includes(key) ? acc : { ...acc, [key]: value },
        {},
      ),
    } as TConfig;
  }

  compatible(...configs: Linter.Config[]) {
    return configs.map((config) => ({
      ...config,
      settings: {
        ...config.settings,
        __COMPATIBILITY__: Compatibility.ESLINTRC,
      },
    }));
  }

  private _findCompatibleConfig(
    configs: Linter.Config[],
    compatibility: Compatibility,
  ) {
    return configs.reduce<Linter.Config | undefined>((acc, config) => {
      return this._isConfigCompatible(config, compatibility) ? config : acc;
    }, undefined);
  }

  private _isConfigCompatible(
    config: Linter.Config,
    compatibility: Compatibility,
  ) {
    return config.settings?.__COMPATIBILITY__ === compatibility;
  }
}
