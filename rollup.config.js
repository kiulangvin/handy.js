const path = require('path')
const json = require('@rollup/plugin-json')


const typescript  = require ('@rollup/plugin-typescript');

const { nodeResolve } = require('@rollup/plugin-node-resolve')

const pkg = process.env.TARGET
const resolve = (p) => {
  return path.resolve(`${__dirname}/packages/${pkg}`, p)
}
const { buildOptions } = require(resolve('package.json'))
const formatMap = {
  esm: {
    file: resolve(`dist/${pkg}.esm.js`),
    format: 'esm',
    sourcemap: true, // 启用 sourcemap
  },
  cjs: {
    file: resolve(`dist/${pkg}.cjs.js`),
    format: 'cjs',
    sourcemap: true, // 启用 sourcemap
  },
  umd: {
    file: resolve(`dist/${pkg}.js`),
    format: 'umd',
    sourcemap: true, // 启用 sourcemap
  }
}
const createConfig = (output) => {
  output.name = buildOptions.name
  return {
    input: resolve('src/index.ts'),
    output,
    plugins: [
      json(),
      typescript({
        tsconfig: path.resolve(__dirname, 'tsconfig.json'), // 导入本地 tsconfig.json
      }), // 支持 TypeScript
      nodeResolve()
    ]
  }
}

const configs = buildOptions.formats.map(format => createConfig(formatMap[format]))

module.exports = configs