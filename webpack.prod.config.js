const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// suppress reason: ESLint false positive reaction
// eslint-disable-next-line import/no-extraneous-dependencies
const EslintPlugin = require('eslint-webpack-plugin');

console.log('Using production configuration from `webpack.prod.config.js`.');

module.exports = {
  mode: 'production',
  entry: './src/index',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '#src': path.resolve('./src'),
    },
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist', 'production'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'pages/index.html',
      minify: true,
    }),
    new EslintPlugin({
      extensions: ['ts', 'js'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
