const webpack = require('webpack');

module.exports = {
  entry: "./app/index.js",
  output: {
    path: "docs",
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: "./docs"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
