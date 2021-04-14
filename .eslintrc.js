const ERROR = 'error'
const OFF = 'off'

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/extensions': [
      ERROR,
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
        js: 'never',
      },
    ],
    'no-use-before-define': OFF,
    '@typescript-eslint/no-use-before-define': [ERROR],
    'import/prefer-default-export': OFF,
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
    'unicorn/filename-case': [
      ERROR,
      {
        cases: {
          // 中划线
          kebabCase: true,
          // 小驼峰
          camelCase: true,
          // 下划线
          snakeCase: false,
          // 大驼峰
          pascalCase: true,
        },
      },
    ],
    'no-console': OFF,
    'unicorn/no-for-loop': ERROR,
  },
  plugins: ['react', 'unicorn', 'promise', '@typescript-eslint', 'prettier'],
}
