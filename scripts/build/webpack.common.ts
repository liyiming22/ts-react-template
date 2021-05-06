import path from 'path'
import WebpackBar from 'webpackbar'
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { Configuration, RuleSetUseItem } from 'webpack'
import { Options as HtmlMinifierOptions } from 'html-minifier'
import { PROJECT_ROOT, PROJECT_NAME, __DEV__ } from '../constants'

const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/

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

function getStyleLoaderConfig(importLoaders: number, modules = false): RuleSetUseItem[] {
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {
        modules,
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

const smp = new SpeedMeasurePlugin()

const commonConfig: Configuration = smp.wrap({
  cache: true,
  entry: path.resolve(PROJECT_ROOT, './src'),
  output: {
    publicPath: '/',
    path: path.resolve(PROJECT_ROOT, './dist'),
    filename: `js/[name]${__DEV__ ? '' : '.[hash:8]'}.bundle.js`,
    hashSalt: PROJECT_NAME || 'default-name',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      Src: path.resolve(PROJECT_ROOT, './src'),
      Components: path.resolve(PROJECT_ROOT, './src/components'),
      Views: path.resolve(PROJECT_ROOT, './src/views'),
      Utils: path.resolve(PROJECT_ROOT, './src/utils'),
      Constants: path.resolve(PROJECT_ROOT, './src/constants'),
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
        test: lessRegex,
        exclude: lessModuleRegex,
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
        test: lessModuleRegex,
        use: [
          ...getStyleLoaderConfig(2, true),
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
  ],
})

export default commonConfig
