import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'

// sync package version after update package version by bummp.
export function updateVersion(packageName: string) {
  const root = process.cwd()
  const pkgJsonPath = path.resolve(root, 'package.json')
  const libPkgJsonPath = path.resolve(root, '..', '..', '..', `packages/${packageName}/package.json`)

  const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'))
  const libPkgJson = JSON.parse(fs.readFileSync(libPkgJsonPath, 'utf8'))
  const version: string = pkgJson.version

  libPkgJson.version = version
  fs.writeFile(libPkgJsonPath, JSON.stringify(libPkgJson, null, 2))
}
