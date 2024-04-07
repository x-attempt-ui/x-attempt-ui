import process from 'node:process'
import { resolve } from 'node:path'

export const rootDir = process.cwd()
export const componentDir = resolve(rootDir, 'components')
