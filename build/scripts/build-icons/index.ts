import { resolve } from 'node:path'
import { build } from 'vite'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import vue from '@vitejs/plugin-vue'
import { createPath, pkgDir, publishDir, root } from '../../utils/paths'

const packageContent = fs.readFileSync(createPath('package.json'), {
  encoding: 'utf-8',
})
const packageJson: Record<string, any> = JSON.parse(packageContent)

async function buildHooks() {
  consola.start('build icons...')

  await fs.emptyDir(publishDir)
  const entry = [
    resolve(root, 'index.ts'),
  ]

  await doBuildBundle(entry, false)
  await doBuildIIFEBundle(entry, false)
  await doBuildIIFEBundle(entry, true)
  setPackageJson()

  consola.success('build icons success!')
}

function doBuildBundle(entry: string[], minify = false) {
  return build({
    plugins: [
      vue(),
      dts({
        tsconfigPath: createPath('./tsconfig.json'),
        outDir: [createPath(publishDir, 'types')],
        exclude: 'scripts/**',
      }),
    ],
    build: {
      minify,
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
          },
          {
            format: 'cjs',
            dir: createPath(publishDir),
            exports: undefined,
          },
        ],
      },
    },
  })
}

async function doBuildIIFEBundle(entry: string[], minify = false) {
  const filename = `index.iife.${minify ? 'min.' : ''}js`
  await fs.emptyDir(createPath('temp'))
  await build({
    plugins: [
      vue(),
    ],
    build: {
      minify,
      sourcemap: false,
      lib: {
        entry,
        formats: ['iife'],
        name: 'XAttemptIcons',
        fileName: () => filename,
      },
      rollupOptions: {
        external: ['vue'],
        treeshake: true,
        output: {
          dir: createPath(publishDir, 'temp'),
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
  await fs.move(createPath(publishDir, 'temp', filename), createPath(publishDir, filename))
  await fs.remove(createPath(publishDir, 'temp'))
}

function setPackageJson() {
  const pkgJson = { ...packageJson }
  pkgJson.name = 'x-attempt-icons'
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
