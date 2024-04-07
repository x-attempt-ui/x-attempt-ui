import { basename } from 'node:path'

export function camelCase(name: string) {
  return name.split('-').map(str => str[0].toUpperCase() + str.slice(1)).join('')
}

export function getName(files: string[]) {
  const filenames = files.map(file => basename(file).replace('.svg', ''))
  const componentNames = filenames.map(fileName => camelCase(fileName))
  return [
    filenames,
    componentNames,
  ]
}
