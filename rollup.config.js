import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import fs from 'fs';

const requere = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from '@rollup/plugin-terser';
import commonjs from "@rollup/plugin-commonjs";

const libName = process.env.TARGET
const target = process.env.TARGET

const input = resolve(__dirname, `./packages/${libName}/src/index.ts`);

const  { buildOptions }  = requere(resolve(__dirname, `./packages/${libName}/package.json`));

const isProduction = process.env.NODE_ENV === "production";

const sourcemap = !isProduction;

const formatMap = {
  esm: {
    file: resolve(__dirname,`./packages/${libName}/dist/${target}.esm.js`),
    format: 'esm', // ES Module。ES6 模块标准 (import 和 export)
    sourcemap
  },
  esm_min: {
    file: resolve(__dirname,`./packages/${libName}/dist/${target}.esm.min.js`),
    format: 'esm', // ES Module。ES6 模块标准 (import 和 export)
    sourcemap,
    plugins: [terser()],
  },
  cjs: {
    file: resolve(__dirname,`./packages/${libName}/dist/${target}.cjs.js`),
    format: 'cjs', // CommonJS。Node.js 模块标准 (module.exports 和 require)。支持node
    sourcemap, // 启用 sourcemap
  },
  umd: {
    file: resolve(__dirname,`./packages/${libName}/dist/${target}.umd.js`),
    format: 'umd', // Universal Module Definition。可以同时运行在浏览器和 Node.js 环境
    name: buildOptions.name,
    sourcemap, // 启用 sourcemap
  }
}
let output = buildOptions.formats.map(format => formatMap[format])

// 手动清空 dist 目录
const distPath = resolve(__dirname,`./packages/${libName}/dist`)
if (fs.existsSync(distPath)) {
  fs.rmSync(distPath, { recursive: true, force: true }); // 删除目录及其内容
}

export default defineConfig({
  input: input,
  output: output,
  plugins: [
    nodeResolve(),
    typescript(
      {
        // 打包时使用的 tsconfig 配置文件，默认会读取项目根目录下的 tsconfig.json 文件
        tsconfig: isProduction? resolve(__dirname, 'tsconfig.prod.json') : resolve(__dirname, 'tsconfig.json'),
      }
    ),
    commonjs(),
  ],
});