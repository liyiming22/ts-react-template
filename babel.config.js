const environmentPreset = [
  '@babel/preset-env',
  {
    // 只导入需要的 polyfill
    useBuiltIns: 'usage',
    // 指定 corejs 的版本
    corejs: 3,
    // 禁用模块化方案转换
    modules: false,
  },
]

module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['@babel/preset-typescript', environmentPreset],
    plugins: [
      '@babel/plugin-transform-runtime',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-optional-chaining',
      ['@babel/plugin-proposal-class-properties', { loose: true }],
    ],
    env: {
      development: {
        presets: [['@babel/preset-react', { development: true }]],
      },
      production: {
        presets: ['@babel/preset-react'],
        plugins: ['@babel/plugin-transform-react-constant-elements', '@babel/plugin-transform-react-inline-elements'],
      },
    },
  }
}
