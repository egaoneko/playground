// webpack.config.js

var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: path.join(__dirname, 'src'),
	entry: './index.js',
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	module: {
		rules: [{
			enforce: 'pre',
			test: /\.js$/,
			loader: 'eslint-loader',
			exclude: /(node_modules|bower_components)/
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /(node_modules|bower_components)/
		}, {
			test: /sinon.*\.js$/,
			loader: "imports-loader?define=>false,require=>false"
		}
		],
		noParse: [/sinon/],
	},
	resolve: {
		alias: {sinon: 'sinon/pkg/sinon'}
	},
	plugins: []
};
