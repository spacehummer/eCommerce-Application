// ESLint rules per file start
/* eslint-disable no-console */
// ESLint rules per file end

const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// suppress reason: ESLint cant identifier inner lvl webpack config file
// eslint-disable-next-line import/no-extraneous-dependencies
const EslintPlugin = require('eslint-webpack-plugin');
const { getTimestamp } = require('./config_utils/config-utils');
// getTimestamp function import

console.log('Using webpack.dev.config.js.');

module.exports = (env) => {
  // module.exports = {
  // Use env.<YOUR VARIABLE> here:
  // noinspection JSUnresolvedVariable
  const noCssInJs = env.no_css_in_js === 'true';
  console.log({ noCssInJs });

  const styleLoaderOrMiniCssExtractPluginLoader = noCssInJs
    ? MiniCssExtractPlugin.loader
    : 'style-loader';

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
        '#srcAlias': path.resolve('./src'),
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
          use: [styleLoaderOrMiniCssExtractPluginLoader, 'css-loader'],
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
