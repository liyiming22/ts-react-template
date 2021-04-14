// eslint-disable-next-line unicorn/prevent-abbreviations
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import commonConfig from './webpack.common'

const productionConfig: Configuration = merge(commonConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
})

export default productionConfig
