import path from 'path'
import WebpackBar from 'webpackbar'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration, RuleSetUseItem } from 'webpack'
import { Options as HtmlMinifierOptions } from 'html-minifier'
import { PROJECT_ROOT, PROJECT_NAME, __DEV__ } from '../constants'

const htmlMiniFierOptions: HtmlMinifierOptions = {
  collapseWhitespace: true,
  collapseBooleanAttributes: true,
  collapseInlineTagWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  minifyURLs: true,
  useShortDoctype: true,
}

function getStyleLoaderConfig(importLoaders: number): RuleSetUseItem[] {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: __DEV__,
        importLoaders,
      },
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: __DEV__ },
    },
  ]
}

const commonConfig: Configuration = {
  cache: true,
  entry: ['react-hot-loader/patch', path.resolve(PROJECT_ROOT, './src')],
  output: {
    publicPath: '/',
    path: path.resolve(PROJECT_ROOT, './dist'),
    filename: `js/[name]${__DEV__ ? '' : '.[hash:8]'}.bundle.js`,
    hashSalt: PROJECT_NAME || 'default-name',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      // 替换 react-dom 成 @hot-loader/react-dom 以支持 react hooks 的 hot reload
      'react-dom': '@hot-loader/react-dom',
      '@': path.resolve(PROJECT_ROOT, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|js)$/,
        loader: 'babel-loader',
        // 开启缓存
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: getStyleLoaderConfig(1),
      },
      {
        test: /\.less$/,
        use: [
          ...getStyleLoaderConfig(2),
          {
            loader: 'less-loader',
            options: {
              sourceMap: __DEV__,
            },
          },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackBar({
      name: 'Project',
      // react blue
      color: '#61dafb',
    }),
    new FriendlyErrorsPlugin(),
    new HtmlWebpackPlugin({
      minify: __DEV__ ? false : htmlMiniFierOptions,
      cache: false,
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
    }),
    // new HardSourceWebpackPlugin()
  ],
}

export default commonConfig
