

import fs from 'fs';
import execa from 'execa';
// 读取packages目录下的所有文件夹
const pkgs = fs.readdirSync('packages').filter(dir => {
  return fs.statSync(`packages/${dir}`).isDirectory()
})
// 构建函数
const build = async (libName) => {
  await execa('rollup', ['-c', '--environment', `TARGET:${libName}`], { stdio: 'inherit' })
}
// 并行执行
const run = (pkgs, build) => {
  const res = []
  for (const libName of pkgs) {
    res.push(build(libName))
  }
  return Promise.all(res)
}
run(pkgs, build)