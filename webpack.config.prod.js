const path = require('path')
const webpack = require( 'webpack')
const HtmlWebpackPlugin = require( 'html-webpack-plugin')
const autoprefixer = require( 'autoprefixer')
const precss = require( 'precss')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  devtool: false,
  entry: [
    'babel-polyfill',
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.[chunkhash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
        )
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    })
  ]
}