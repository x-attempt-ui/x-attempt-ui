import fs from 'node:fs'
import { Command } from 'commander'
import consola from 'consola'
import buildComponent from './scripts/build-component'
import buildStyle from './scripts/build-style'
import buildHooks from './scripts/build-hooks'
import buildIcons from './scripts/build-icons'
import clear from './scripts/clear'
import { createPath, pkgDir } from './utils/paths'

const program = new Command()
const packageContent = fs.readFileSync('./package.json', {
  encoding: 'utf-8',
})
const packageJson: Record<string, any> = JSON.parse(packageContent)

program
  .name('x-attempt-build')
  .version(packageJson.version)
  .description('x-attempt-ui build tool')

program
  .command('buildComp')
  .description('build component module')
  .action((_args) => {
    buildComponent()
  })

program
  .command('buildStyle')
  .description('build component style')
  .action((_args) => {
    buildStyle()
  })

program
  .command('buildHooks')
  .description('build hooks')
  .action((_args) => {
    buildHooks()
  })

program
  .command('buildIcons')
  .description('build icons')
  .action((_args) => {
    buildIcons()
  })

program
  .command('build')
  .description('build component')
  .action(async (_args) => {
    await buildComponent()
    await buildStyle()
    setPackageJson()
  })

program
  .command('clear')
  .description('clear build product')
  .action((_args) => {
    clear()
  })

program.parse()

function setPackageJson() {
  const pkgJson = { ...packageJson }
  pkgJson.name = 'x-attempt-ui'
  pkgJson.scripts.publish = 'release-it'
  fs.writeFile(
    createPath(pkgDir),
    JSON.stringify(pkgJson, null, 2),
    'utf8',
    (err) => {
      if (!err)
        return

      consola.error('set package.json failed. \n')
      consola.error(err)
    },
  )
}
