import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import commonConfig from './webpack.common'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const prodConfig: Configuration = merge(commonConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin()
  ]
})

export default prodConfig
