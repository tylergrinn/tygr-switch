const path = require('path');

const PACKAGE_NAME = 'tygr-logo';
const LIBRARY_NAME = 'TygrLogo';

module.exports = {
  entry: {
    [`${PACKAGE_NAME}.min`]: './src/index.ts',
  },
  output: {
    path: path.join(__dirname, 'lib'),
    libraryTarget: 'window',
    libraryExport: 'default',
    library: LIBRARY_NAME,
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
  mode: process.env.NODE_ENV || 'development',
  externals: { react: 'React' },
};
