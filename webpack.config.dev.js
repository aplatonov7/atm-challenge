const path = require('path')
const webpack = require( 'webpack')
const HtmlWebpackPlugin = require( 'html-webpack-plugin')
const autoprefixer = require( 'autoprefixer')
const precss = require( 'precss')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/],
        loaders: ['babel'],
        include: path.join(__dirname, 'app')
      }
    ]
  },
  postcss: function () {
    return [autoprefixer, precss];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':'"development"'
    })
  ]
}