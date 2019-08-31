const path = require('path')

module.exports = {
  entry: './react/index.js',
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: 'content.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'inline-source-map',
}