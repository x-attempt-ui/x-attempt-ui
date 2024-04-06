import fs from 'fs-extra'
import { glob } from 'fast-glob'
import sass from 'sass'
import { consola } from 'consola'
import CleanCss from 'clean-css'
import { createPath, distDir, esDir, libDir, srcDir } from '../../utils/paths'

async function buildStyle() {
  consola.start('build component style...')

  await fs.ensureDir(createPath(esDir))
  await fs.ensureDir(createPath(libDir))

  const files = glob.sync('**/*.{scss,css}', {
    cwd: srcDir,
  })
  const cleanCss = new CleanCss()

  for (const filename of files) {
    const absolutePath = createPath(`src/${filename}`)

    // 复制源文件到打包目录
    fs.copySync(absolutePath, createPath(`${esDir}/${filename}`))
    fs.copySync(absolutePath, createPath(`${libDir}/${filename}`))
    if (!filename.endsWith('.scss'))
      continue

    // 打包scss文件
    const scssContent = await sass.compileAsync(absolutePath)
    const cssFilename = filename.replace('.scss', '.css')
    const css = cleanCss.minify(scssContent.css).styles
    fs.writeFileSync(createPath(`${esDir}/${cssFilename}`), css)
    fs.writeFileSync(createPath(`${libDir}/${cssFilename}`), css)
  }
  await copyIndexFile()
  consola.success('build component style success!')
}

async function copyIndexFile() {
  fs.copySync(createPath(`${esDir}/index.css`), createPath(`${distDir}/index.css`))
}

export default buildStyle
