var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './client/core/bootstrap'
  },
  output: {
    path: path.join(__dirname, './server/public/build'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['', 'index.js', '.js', '.styl', '.css']
  },

  devtool: 'source-map',

  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader?minimize"
    }, {
      test: /\.styl$/,
      loader: "style-loader!css-loader?minimize!stylus-loader"
    }, {
      test: /\.js$/,
      loader: 'ng-annotate!babel!jshint',
      exclude: /node_modules|bower_components/
    }, ]
  }
};