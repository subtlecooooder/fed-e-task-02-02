const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') 
const CopyWebpackPlugin = require('copy-webpack-plugin') 
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'js/bundle.[contenthash:8].js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: ['public']
    }),
    new webpack.DefinePlugin({
      BASE_URL: '""'
    })
  ]
})
