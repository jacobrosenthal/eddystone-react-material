var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  target: 'web',
  entry: [
      './example/index'
  ],
  output: {
    path: path.join(__dirname, 'example'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.IgnorePlugin(new RegExp('^(bluetooth-hci-socket|child_process)$')), // for bleno
    new webpack.IgnorePlugin(/binding\.node$/), // for bleno
    new ExtractTextPlugin('app.css')
  ],
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }, // for bleno
      {
        test: /\.jsx?$/,
        loaders: [ 'babel' ],
        include: path.join(__dirname, 'example')
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?module!cssnext-loader') }
    ]
  },
  resolve: {
    extensions: [ '', '.js', '.json' ],
    alias: {
      fs: 'browserify-fs' // for bleno
    }
  }
};
