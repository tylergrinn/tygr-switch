/** @type {import('webpack').Configuration} */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PROD = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './demo/index.ts',
  output: {
    path: path.join(__dirname, '..', 'lib', 'demo'),
    filename: '[name].[contenthash].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devtool: PROD ? false : 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      template: 'demo/index.html',
    }),
  ],
};
