const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ExampleBuilder = require('./example-builder');
const fs = require('fs');
const path = require('path');

const exampleRoot = path.join(__dirname, '..');
let examples = [];
walkDir(path.join(__dirname, '../'), (path) => examples.push(path));
examples = examples
  .filter(name => /^(?!index).*\.html$/.test(name))
  .map(name => [name.replace(/\.html$/, '').replace(exampleRoot, '')]);

const entry = {};
examples.forEach(example => {
  entry[example] = `./${example}.js`;
});

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f), f);
  });
};

module.exports = {
  context: path.join(__dirname, '..'),
  target: 'web',
  entry: entry,
  module: {
    rules: [{
      use: {
        loader: 'buble-loader'
      },
      test: /\.js$/,
      include: [
        path.join(__dirname, '..', '..', 'src'),
        path.join(__dirname, '..')
      ]
    }]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        // Do not minify examples that inject code into workers
        exclude: [/(color-manipulation|region-growing|raster)\.js/]
      })
    ],
    runtimeChunk: {
      name: 'common'
    },
    splitChunks: {
      name: 'common',
      chunks: 'initial',
      minChunks: 2
    }
  },
  plugins: [
    new ExampleBuilder({
      templates: path.join(__dirname, '..', 'templates'),
      common: 'common'
    }),
    new CopyPlugin([
      {from: '../src/pg/pg.css', to: 'css'},
      {from: 'data', to: 'data'},
      {from: 'resources', to: 'resources'},
      {from: 'Jugl.js', to: 'Jugl.js'},
      {from: 'index.html', to: 'index.html'}
    ])
  ],
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '..', '..', 'build', 'examples')
  },
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0' // default : 127.0.0.1
  }
};
