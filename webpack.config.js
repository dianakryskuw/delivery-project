var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'client/public');
var APP_DIR = path.resolve(__dirname, 'client/app');

var config = {
	entry: APP_DIR + '/index.js',
	output: {
		path: BUILD_DIR,
		filename: 'bundle.js'
	},
	resolve: {
		root: [path.resolve(__dirname, 'client/app'), path.resolve(__dirname, 'node_modules')],
		extensions: ['', '.js']
	},
	module: {
        loaders: [
			{
		    	test : /\.js?/,
	    		include : APP_DIR,
	    		loader : 'babel-loader',
	    		query: {
	            	presets: ['react', 'es2015', 'stage-0'],
	            	plugins: ['react-html-attrs', 'transform-class-properties']
				}
			},
			{
			  test: /\.css$/,
			  loader: ExtractTextPlugin.extract("css")
			}
        ]
    },
	plugins: [
		new ExtractTextPlugin("styles.css")
	],
	externals:{
		"fs": "commonjs fs"
	}
};

module.exports = config;