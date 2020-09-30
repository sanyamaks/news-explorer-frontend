const path = require('path');
const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, //style-loader
          { loader: 'css-loader', options: { importLoaders: 2 } }, // Преобразует @import
          // 'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: './images/[name].[ext]',
        },
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Подгружает HTML
      inject: false,
      hash: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      // Излекает css в отдельный файлы
      filename: '[name].[contenthash].css',
    }),
    new CleanWebpackPlugin(),
    new WebpackMd5Hash(),

    new Webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devtool: 'inline-source-map',
};
