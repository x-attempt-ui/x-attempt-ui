import path from 'node:path'
import process from 'node:process'

export const root = process.cwd()
export function createPath(...p: string[]) {
  return path.resolve(root, ...p)
}
export const publishDir = 'publish'
export const pkgDir = 'publish/package.json'
export const esDir = 'publish/es'
export const libDir = 'publish/lib'
export const distDir = 'publish/dist'
export const indexDir = path.resolve(root, './src/index.ts')
export const srcDir = path.resolve(root, './src')
export const compDir = path.resolve(root, './src/components')
