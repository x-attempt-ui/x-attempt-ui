import { build } from 'vite'
import { glob } from 'fast-glob'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import { createPath, pkgDir, publishDir, root } from '../../utils/paths'

const packageContent = fs.readFileSync(createPath('package.json'), {
  encoding: 'utf-8',
})
const packageJson: Record<string, any> = JSON.parse(packageContent)

async function buildHooks() {
  consola.start('build hooks...')

  await fs.emptyDir(publishDir)
  const entry = [
    ...glob
      .sync('**/*.ts', {
        absolute: true,
        cwd: root,
      }),
  ]

  await build({
    plugins: [
      dts({
        tsconfigPath: createPath('./tsconfig.json'),
        outDir: [createPath(publishDir)],
      }),
    ],
    build: {
      minify: false,
      sourcemap: false,
      lib: {
        entry,
      },
      rollupOptions: {
        external: ['vue'],
        treeshake: true,
        output: [
          {
            format: 'esm',
            dir: createPath(publishDir),
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: root,
            entryFileNames: `[name].js`,
          },
        ],
      },
    },
  })

  setPackageJson()

  consola.success('build hooks success!')
}

function setPackageJson() {
  const pkgJson = { ...packageJson }
  pkgJson.name = 'x-attempt-hooks'
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

export default buildHooks
