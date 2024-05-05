import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import buildComponent from './build-component'
import buildStyle from './build-style'

build()

async function build() {
  copyReadme()
  await buildComponent()
  await buildStyle()
}

function copyReadme() {
  fs.copyFileSync(
    path.resolve(process.cwd(), 'README.md'),
    path.resolve(process.cwd(), 'build/src/build-component/README.md'),
  )
}
