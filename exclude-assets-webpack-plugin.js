/**
 * Tyler J Grinn
 * tylergrinn@gmail.com
 * License: MIT
 */
module.exports = class ExcludeAssetsWebpackPlugin {
  static PLUGIN_NAME = 'Exclude assets webpack plugin';

  /**
   *
   * @param  {...{ entry: string, ext: string }} patterns ***Patterns:** Any number of descriptions
   * of assets to remove. Each pattern needs an
   *
   * `entry` and `ext`
   *
   * property. If an asset matches both, it will be removed from the compilation
   *
   * **Note:** if your entry is not named you should use 'main' for the entry.
   */
  constructor(...patterns) {
    this.patterns = patterns || [];
  }
  apply(compiler) {
    compiler.hooks.afterCompile.tap(
      ExcludeAssetsWebpackPlugin.PLUGIN_NAME,
      (compilation) => {
        compilation.hooks.additionalAssets.tap(
          ExcludeAssetsWebpackPlugin.PLUGIN_NAME,
          (assets) => {
            this.patterns.forEach((pattern) => {
              if (compilation.entrypoints.has(pattern.entry)) {
                const entrypoint = compilation.entrypoints.get(pattern.entry);
                const files = entrypoint.getEntrypointChunk().files;

                files.forEach((file) => {
                  if (file.split('.').slice(-1)[0] === pattern.ext) {
                    compilation.deleteAsset(file);
                  }
                });
              }
            });
          }
        );
      }
    );
  }
};
