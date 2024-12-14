import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { type Linter } from 'eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

const isPathRelative = (path: string) => /\.{1,2}\//.test(path);

const resolveConfig = (baseDirectory: string) => (config: string) =>
  isPathRelative(config) ? path.resolve(baseDirectory, config) : config;

export class ConfigCompat extends FlatCompat {
  private _baseDirectory?: string;

  constructor(options?: ConfigCompatOptions) {
    const filename = options?.fileUrl
      ? fileURLToPath(options?.fileUrl)
      : undefined;
    const baseDirectory = filename ? path.dirname(filename) : undefined;

    super({
      baseDirectory,
      recommendedConfig: js.configs.recommended,
      allConfig: js.configs.all,
    } as FlatCompatOptions);

    this._baseDirectory = baseDirectory;
  }

  eslintrc(
    flatConfig: Linter.Config,
    configsToExtend?: string[],
  ): Linter.LegacyConfig {
    const {
      plugins,
      processor,
      languageOptions,
      settings,
      files,
      ignores,
      ...baseConfigProps
    } = flatConfig;

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
      extends: configsToExtend?.map(resolveConfig(this._baseDirectory ?? './')),
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
}
