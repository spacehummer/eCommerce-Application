// ESLint rules per file start
/* eslint-disable no-console */
// ESLint rules per file end

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('Using webpack.prod.config.js.');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'pages/index.html',
    minify: true,
  })],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
