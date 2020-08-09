const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: {
    test: path.resolve(__dirname, './desktopApp/test.ts'),
    desktop: path.resolve(__dirname, './desktopApp/app.ts'),
    vl2c: path.resolve(__dirname, './src/index.ts'),
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, './dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [{ test: /\.(ts|js)x?$/, loader: 'babel-loader', exclude: /node_modules/ }],
  },
  externals: [nodeExternals()],
};
