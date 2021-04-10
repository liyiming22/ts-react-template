import path from 'path'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import 'webpack-dev-server'
import commonConfig from './webpack.common'
import { DEFAULT_PORT, HOST, PROJECT_ROOT } from '../constants'

const devConfig: Configuration = merge(commonConfig, {
  mode: 'development',
  // a bug in webpack-dev-server v3 https://github.com/webpack/webpack-dev-server/issues/2758 when you're using it with webpack 5 and browserslist. 
  // 所以这里需要设置 target 为 web
  target: 'web',
  devtool: 'eval-cheap-module-source-map',
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: path.resolve(PROJECT_ROOT, 'tsconfig.json'),
        memoryLimit: 1024
      }
    }),
  ],
  devServer: {
    host: HOST,
    port: DEFAULT_PORT,
    stats: 'errors-only',
    clientLogLevel: 'silent',
    compress: true,
    // open: true,
    hot: true
  },
})

export default devConfig
