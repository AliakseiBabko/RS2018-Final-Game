let path = require('path');
const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

let conf = {
	entry: {
		index: './src/index.js',
		index1: './src/index1.js',
		index2: './src/index2.js',
		index3: './src/index3.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].js',
		library: '[name]',
		publicPath: 'dist/'
	},
	/*watch: true,
	watchOptions: {
		aggregateTimeout: 100
	},*/
	devServer: {
		overlay: true
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
				options: {
					plugins: ['lodash']
					//presets: [['env', { 'modules': false, 'targets': { 'node': 4 } }]]
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			/*{
        		test: /\.json$/,
       			loader: 'json-loader'
      		}*/
      		{ 
            	test: /\.json$/, 
            	use: [ 'json-loader' ] ,
            	type: "javascript/auto"
         	},
         	{
        		test: /\.(png|jpg|gif|svg)$/,
        		use: [
          			{
            			loader: 'file-loader',
            			options: {}  
          			}
        		]
      		}
        ]
	},
	plugins: [
    	new LodashModuleReplacementPlugin({
  			'collections': true,
  			'paths': true
		})
  	],
	devtool: 'eval-sourcemap'
}

module.exports = conf;
