const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                'src/styles/vars.scss',
                'src/styles/mixins.scss',
              ],
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Christmas shop - gifts and decorations!',
      filename: 'index.html',
      template: path.resolve(__dirname, './index.html'),
      favicon: './src/assets/favicon/tree.ico',
    }),
    new CleanWebpackPlugin(),
    new ESLintPlugin(),
  ],
};

module.exports = baseConfig;
