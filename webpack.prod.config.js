const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const prodConfig = {
  mode: 'production',
};

module.exports = merge(baseConfig, prodConfig);
