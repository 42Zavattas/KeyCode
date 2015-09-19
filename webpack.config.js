var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
  resolve: {
    extensions: ['', '.js']
  },
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './client.js'
  ],
  output: {
    path: path.resolve('./build'),
    publicPath: '/public/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel'
        ]
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css',
          'autoprefixer',
          'sass'
        ]
      },
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      }
    })
  ],
  devtool: 'eval'
};

module.exports = webpackConfig;
