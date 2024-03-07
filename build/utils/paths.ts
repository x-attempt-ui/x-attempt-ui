import path from 'node:path'
import process from 'node:process'

export const root = process.cwd()
export function createPath(...p: string[]) {
  return path.resolve(root, ...p)
}
export const esDir = 'es'
export const libDir = 'lib'
export const srcDir = path.resolve(root, './src')
export const compDir = path.resolve(root, './src/components')
