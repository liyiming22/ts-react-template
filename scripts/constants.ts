import path from 'path'

// eslint-disable-next-line no-underscore-dangle
const __DEV__ = process.env.NODE_ENV !== 'production'
const PROJECT_ROOT = path.resolve(__dirname, '../')
const PROJECT_NAME = 'Project'
const HOST = '127.0.0.1'
const DEFAULT_PORT = 5000

export { __DEV__, HOST, DEFAULT_PORT, PROJECT_ROOT, PROJECT_NAME }
