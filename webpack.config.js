var path = require('path');
 
module.exports = {
    entry: {
      app: './client/core/bootstrap'
    },
    output: {
        path: path.join(__dirname, './client/build'),
        filename: 'bundle.js'
    },
 
    resolve: {
      extensions: ['', 'index.js', '.js', '.styl']
    },
 
    devtool: 'source-map',
 
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.styl$/,
          loader: "style-loader!css-loader!stylus-loader"
        },
        {
           test: /\.js$/,
           loader: 'ng-annotate!babel!jshint',
           exclude: /node_modules|bower_components/
        },
      ]
    }
};