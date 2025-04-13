import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { Linter } from 'eslint';
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

export class ConfigCompat extends FlatCompat {
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
  }

  toFlat(...configs: string[]) {
    return super.extends(...configs);
  }
}
