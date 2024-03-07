import fs from 'node:fs'
import { Command } from 'commander'
import buildComponent from './scripts/build-component'
import buildStyle from './scripts/build-style'
import clear from './scripts/clear'

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
  .command('build')
  .description('build component')
  .action(async (_args) => {
    await buildComponent()
    await buildStyle()
  })

program
  .command('clear')
  .description('clear build product')
  .action((_args) => {
    clear()
  })

program.parse()
