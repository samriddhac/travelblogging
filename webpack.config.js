var path = require('path');
var webpack = require('webpack'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin');

var config ={
	entry:[
		'./src/client/js/index'
	],
	output: {
		path:path.join(__dirname, 'dist/client'),
		filename:'app.bundle.js',
		publicPath:'/'
	},
	resolve:{
		extensions:[ '.js', '.jsx' ]
	},
	module:{
		loaders:[
			{
				test:/\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}

		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			warnings:true
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new HtmlWebpackPlugin({
			template: './src/client/html/index.html'
		}),
		new CopyWebpackPlugin([
			{ from: './src/client/css', to: './style'},
			{ from: './src/client/images', to: './images'}
		])
	],
	devServer:{
		port:3030,
		contentBase: './dist/client'
	}
};
module.exports = config;