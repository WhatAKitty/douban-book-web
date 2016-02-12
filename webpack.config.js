var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var reactSemantifyPath = path.join(__dirname, 'components', 'react-semantify');

module.exports = {
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  },
  entry: {
    common: "./components/Common.react.js",
    bundle: "./components/App.react.js"
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'js/[name].js',
    chunkFilename: '[id].[name].js'
  },
  devtool: 'source-map',
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file-loader' },
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  plugins: [
      new ExtractTextPlugin("css/[name].css")
  ]
};