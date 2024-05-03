import path from 'node:path'
import process from 'node:process'

export const root = process.cwd()
export function createPath(...p: string[]) {
  return path.resolve(root, ...p)
}
export const releaseDir = 'release.mjs'
export const esDir = 'es'
export const libDir = 'lib'
export const distDir = 'dist'
export const indexDir = path.resolve(root, './src/index.ts')
export const srcDir = path.resolve(root, './src')
export const compDir = path.resolve(root, './src/components')
