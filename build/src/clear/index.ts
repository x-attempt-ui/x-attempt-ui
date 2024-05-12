import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'

clear()

function clear() {
  const root = process.cwd()
  const paths = [
    path.resolve(root, 'build/src/build-component/dist'),
    path.resolve(root, 'build/src/build-component/es'),
    path.resolve(root, 'build/src/build-component/lib'),
    path.resolve(root, 'build/src/build-hooks/dist'),
    path.resolve(root, 'build/src/build-icons/dist'),
  ]

  paths.forEach((path) => {
    fs.removeSync(path)
  })
}
