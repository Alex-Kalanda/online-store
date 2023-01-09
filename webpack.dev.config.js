const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../dist'),
    },
    open: true,
    historyApiFallback: true,
    hot: true,
    liveReload: true,
    port: 3005,
  },
};

module.exports = merge(baseConfig, devConfig);
