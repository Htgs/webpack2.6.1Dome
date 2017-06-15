const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = require('./env.js')

function resolve (...dir) {
	return path.join(...dir)
}

let configs = {
	entry: {
		index: resolve(__dirname, 'src', 'main.js'),
		vendors: ['axios', 'lodash', 'jquery']
	},
	output: {
		filename: '[name].js',
		path: resolve(__dirname, 'dist'),
		chunkFilename: '[id].[name].js',
		publicPath: (process.env.NODE_ENV == 'development' ? 'http://localhost:23333/dist/' : '/dist/')
	},
	resolve: {
		extensions: ['.js', '.vue', '.css'],
		alias: {
			'static': resolve(__dirname, 'static'),
			'@': resolve(__dirname, 'src')
		}
	},
	module: {
		rules: [
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				options: {
					formatter: require('eslint-friendly-formatter')
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: 'css-loader',
							fallback: 'vue-style-loader'
						}),
						sass: ExtractTextPlugin.extract({
							use: 'sass-loader?indentedSyntax',
							fallback: 'vue-style-loader'
						}),
						scss: ExtractTextPlugin.extract({
							use: 'sass-loader',
							fallback: 'vue-style-loader'
						})
					}
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src')]
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader']
				})
				// use: [
				// 	{
				// 		loader: 'style-loader'
				// 	},
				// 	{
				// 		loader: 'css-loader'
				// 	}
				// ]
				// loader: ExtractTextPlugin.extract(['style-loader', 'css-loader'])
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		// new webpack.LoaderOptionsPlugin({
		// 	options: {
		// 		vue: {
		// 			loaders: {
		// 				js: 'babel',
		// 				css: ExtractTextPlugin.extract(['vue-style-loader', 'css-loader']),
		// 				sass: ExtractTextPlugin.extract(['vue-style-loader', 'css-loader!sass-loader'])
		// 			}
		// 		}
		// 	}
		// }),
		new ExtractTextPlugin('css/index.css'),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor-bundle.js'
		}),
		new webpack.ProvidePlugin({
			axios: 'axios',
			'window.axios': 'axios',

			_: 'lodash',
			'window._': 'lodash',

			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'window.$': 'jquery'
		})
	],
	node: {
		fs: 'empty',
		module: 'empty'
	}
}

if (process.env.NODE_ENV === 'development') {
	configs = merge(configs, {
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE.ENV': 'development'
			}),
			new webpack.HotModuleReplacementPlugin()
		],
		devServer: {
			historyApiFallback: true,
			inline: true,
			hot: true,
			port: 23333,
			contentBase: resolve(__dirname, 'dist')
			// proxy: {
			// 	'/**': {
			// 		changeOrigin: true,
			// 		target: env.app_url,
			// 		secure: false
			// 	}
			// }
		}
	})
} else {
	configs = merge(configs, {
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			// minify JS
			// new webpack.optimize.UglifyJsPlugin({
			// 	compress: {
			// 		warnings: false
			// 	}
			// }),
			new webpack.optimize.OccurrenceOrderPlugin()
		]
	})
}

module.exports = configs
