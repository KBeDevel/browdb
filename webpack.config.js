const path = require('path')

/** @type {import('webpack').WebpackOptionsNormalized} */
module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: {
    filename: 'browdb.js',
    path: path.resolve(__dirname, '_bundles')
  },
  resolve: {
      extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|tests)/
      },
    ]
  }
}
