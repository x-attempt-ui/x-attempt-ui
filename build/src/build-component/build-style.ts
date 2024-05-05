import path from 'node:path'
import fs from 'fs-extra'
import fsGlob from 'fast-glob'
import sass from 'sass'
import { consola } from 'consola'
import CleanCss from 'clean-css'
import { DIST_DIR, ES_DIR, LIB_DIR, usePath } from '../../utils/paths'

const {
  getRoot,
  getOutputPath,
} = usePath('x-attempt-ui', 'build-component')

const root = getRoot()
const distDir = getOutputPath(DIST_DIR)
const esDir = getOutputPath(ES_DIR)
const libDir = getOutputPath(LIB_DIR)

async function buildStyle() {
  consola.start('build component style...')

  await fs.ensureDir(esDir)
  await fs.ensureDir(libDir)

  const files = fsGlob.sync('**/*.{scss,css}', {
    cwd: path.resolve(root, 'src'),
  })
  const cleanCss = new CleanCss()

  for (const filename of files) {
    const absolutePath = path.resolve(root, `src/${filename}`)

    // 复制源文件到打包目录
    fs.copySync(absolutePath, path.resolve(esDir, filename))
    fs.copySync(absolutePath, path.resolve(libDir, filename))
    if (!filename.endsWith('.scss'))
      continue

    // 打包scss文件
    const scssContent = await sass.compileAsync(absolutePath)
    const cssFilename = filename.replace('.scss', '.css')
    const css = cleanCss.minify(scssContent.css).styles
    fs.writeFileSync(path.resolve(`${esDir}/${cssFilename}`), css)
    fs.writeFileSync(path.resolve(`${libDir}/${cssFilename}`), css)
  }
  await copyIndexFile()
  consola.success('build component style success!')
}

async function copyIndexFile() {
  fs.copySync(`${esDir}/index.css`, `${distDir}/index.css`)
}

export default buildStyle
