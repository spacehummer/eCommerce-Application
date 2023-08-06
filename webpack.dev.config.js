const path = require('path');
// suppress reason: ESLint false positive reaction
// plugin for work with HTML template: using `index.html` as base for final app html file
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// suppress reason: ESLint false positive reaction
// plugin for extract css (not inline) in dev build
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// suppress reason: ESLint false positive reaction
// plugin for webpack for work with ESLint: check every build ESLint errors
// eslint-disable-next-line import/no-extraneous-dependencies
const EslintPlugin = require('eslint-webpack-plugin');
// getTimestamp function import, used for generate folder name for every dev build
const { getTimestamp } = require('./config_utils/config-utils');

console.log('Using development configuration from`webpack.dev.config.js`.');

module.exports = (env) => {
  // false positive reaction: IDE and linters cant see env variable
  // noinspection JSUnresolvedVariable
  const noCssInJs = env.no_css_in_js === 'true';
  console.log(`Don\`t inline CSS in JS:`, { noCssInJs });

  // chose style loader: save styles as css, or inline
  const chosenStyleLoader = noCssInJs ? MiniCssExtractPlugin.loader : 'style-loader';

  return {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index'),
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
      open: false,
      client: {
        overlay: false,
        progress: true,
      },
    },
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        '#src': path.resolve('./src'),
      },
    },
    output: {
      filename: '[name].[contenthash:8].js',
      chunkFilename: '[name].chunk.js',
      path: path.resolve(__dirname, 'dist', getTimestamp()),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'pages/index.html',
        minify: false,
      }),
      new MiniCssExtractPlugin(),
      new EslintPlugin({
        extensions: ['ts', 'js'],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [chosenStyleLoader, 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: '[name].[hash][ext]',
          },
        },
        {
          test: /\.ts$/i,
          use: 'ts-loader',
        },
      ],
    },
    optimization: {
      minimize: false,
      runtimeChunk: 'single',
    },
  };
};
