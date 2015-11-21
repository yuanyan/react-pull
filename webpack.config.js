var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    // Set up an ES6-ish environment
    'babel-polyfill',
    // Add your application's scripts below
    // './src/index',
    './demo/index',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
    publicPath: '/',
    filename: 'index.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
    {
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "src"),
        path.resolve(__dirname, "demo"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'react'],
      }
    },
    ]
  },
  devServer: {
    contentBase: "./demo"
  },
};
