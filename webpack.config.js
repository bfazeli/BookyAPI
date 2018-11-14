// webpack.config.js
const slsw = require('serverless-webpack');
const path = require('path')

module.exports = {
	entry: slsw.lib.entries,  
	target: 'node',
	// context: path.resolve(__dirname, '.'),
	node: {
		// __dirname: true
	},
  mode: 'development',
	module:{
    rules:[
  		{test: /\.js$/ , loader:'babel-loader', exclude: '/node_modules/'},
  		{test: /\.jsx$/, loader:'babel-loader', exclude: '/node_modules/'}
  	]
  }
}