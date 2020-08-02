const common = require('./webpack.common')
const { merge } = require('webpack-merge')
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    open: true,
    contentBase: 'public'
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: '""'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

