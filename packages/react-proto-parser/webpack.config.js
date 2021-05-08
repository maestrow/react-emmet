/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const getPath = (relative) => path.join(__dirname, relative);

module.exports = env => ({
  context: getPath(''),
  entry: {
    main: env.src
  },
  devtool: "source-map",
  resolve: {
    alias: {
      src: getPath('src')
    },
    extensions: ['.ts', '.js'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: getPath("tsconfig.json") })
    ]
  },
  output: {
    path: getPath('dist')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
});