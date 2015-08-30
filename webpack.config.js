var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
      './example/index'
  ],
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js',
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'example')
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json']
  }
};
