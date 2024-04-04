import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import { cwd } from 'node:process'

function createNojekyllFile() {
  const path = resolve(cwd(), '.nojekyll')
  writeFileSync(path, '', {
    encoding: 'utf8',
  })
}

// 只在github actions中运行，用于生成 .nojekyll 文件，用于通知github pages无需使用 Jekyll 处理，否则会丢失vitepress的样式
createNojekyllFile()
