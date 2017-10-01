// webpack.config.js

/*global require, process, module, __dirname*/

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var extractSass = new ExtractTextPlugin({
  filename: "style.css",
  // disable: process.env.NODE_ENV === "development"
});

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.(sass|scss)$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /(node_modules|bower_components)/
    }]
  },
  plugins: [
    extractSass
  ],
  devServer: {
    contentBase: path.join(__dirname, "public"),
    historyApiFallback: true,
    noInfo: true,
    watchContentBase: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("development"),
      },
      STATIC: JSON.stringify("")
    })
  ]);
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify("production")
      },
      STATIC: JSON.stringify("/dist")
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);
}
