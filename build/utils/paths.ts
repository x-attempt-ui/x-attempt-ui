import path from 'node:path'
import process from 'node:process'

export const DIST_DIR = 'dist'
export const ES_DIR = 'es'
export const LIB_DIR = 'lib'

export function usePath(pkgName: string, buildPath: string) {
  const cwdRoot = process.cwd()

  const getRoot = () => {
    return path.resolve(cwdRoot, 'packages', pkgName)
  }

  const getPkgJsonPath = () => {
    return path.resolve(getRoot(), 'package.json')
  }

  const getTsConfigPath = () => {
    return path.resolve(getRoot(), 'tsconfig.json')
  }

  const getOutputPath = (dir = DIST_DIR) => {
    return path.resolve(cwdRoot, 'build/src', buildPath, dir)
  }

  return {
    getRoot,
    getPkgJsonPath,
    getTsConfigPath,
    getOutputPath,
  }
}
