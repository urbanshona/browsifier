const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const TsconfigPathsPlugin = require ('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src'),
  target: "node",

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    plugins: [new TsconfigPathsPlugin({})]
  },

  module: {
    rules: [
        {
          test: /\.(ts|js)x?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ]
};
