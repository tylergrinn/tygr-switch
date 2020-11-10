const { merge } = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExcludeAssetsPlugin = require('./exclude-assets-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const PACKAGE_NAME = 'tygr-logo';
const LIBRARY_NAME = 'TygrLogo';

const common = {
  entry: './src/index.ts',
  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /[\\/]node_modules[\\/]/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: false,
            },
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  stats: 'minimal',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  optimization: {
    minimize: false,
  },
  mode: process.env.NODE_ENV || 'development',
};

const node = merge(common, {
  entry: {
    index: './src/index.ts',
  },
  externals: [nodeExternals()],
});

const standalone = merge(common, {
  entry: {
    standalone: './src/standalone.ts',
  },
  externals: [
    nodeExternals({
      allowlist: ['react', 'react-dom'],
    }),
  ],
});

const browser = merge(common, {
  entry: {
    [`${PACKAGE_NAME}.min`]: './src/index.ts',
  },
  output: {
    libraryTarget: 'window',
    library: LIBRARY_NAME,
    libraryExport: 'default',
  },
  optimization: {
    minimize: true,
  },
  externals: { react: 'React' },
});

const styles = merge(common, {
  entry: {
    styles: './src/styles/main.scss',
  },
  plugins: [
    new ExcludeAssetsPlugin({ entry: 'styles', ext: 'js' }),
    new MiniCssExtractPlugin({ filename: `${PACKAGE_NAME}.min.css` }),
    new CopyPlugin({ patterns: [path.resolve(__dirname, 'src', 'styles')] }),
    new OptimizeCssAssetsPlugin(),
  ],
});

module.exports = [node, standalone, browser, styles];
