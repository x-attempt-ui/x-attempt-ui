const { resolve } = require('node:path')
const { writeFileSync } = require('node:fs')

function createNojekyllFile() {
  const path = resolve(__dirname, '..', '.nojekyll')
  writeFileSync(path, '', {
    encoding: 'utf8',
  })
}

// 生成 .nojekyll 文件，用于通知github pages无需使用 Jekyll 处理
createNojekyllFile()
