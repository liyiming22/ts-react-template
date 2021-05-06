// eslint-disable-next-line unicorn/prevent-abbreviations
import { merge } from 'webpack-merge'
import { Configuration } from 'webpack'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer'
import commonConfig from './webpack.common'

const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer

const productionConfig: Configuration = merge(commonConfig, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin(), new BundleAnalyzerPlugin()],
})

export default productionConfig
