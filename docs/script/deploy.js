const { resolve } = require('node:path')
const { writeFileSync } = require('node:fs')

function createNojekyllFile() {
  const path = resolve(__dirname, '..', '.nojekyll')
  writeFileSync(path, '', {
    encoding: 'utf8',
  })
}

createNojekyllFile()
