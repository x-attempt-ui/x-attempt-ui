import path, { resolve } from 'node:path'
import { build } from 'vite'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import vue from '@vitejs/plugin-vue'
import { usePath } from '../../utils/paths'

const {
  getRoot,
  getOutputPath,
  getTsConfigPath,
} = usePath('x-attempt-icons', 'build-icons')

const root = getRoot()
const outputPath = getOutputPath()
const tsConfigPath = getTsConfigPath()

buildIcons()

async function buildIcons() {
  consola.start('build icons...')

  await fs.emptyDir(outputPath)
  const entry = [
    resolve(root, 'index.ts'),
  ]

  await doBuildBundle(entry, false)
  await doBuildIIFEBundle(entry, false)
  await doBuildIIFEBundle(entry, true)

  consola.success('build icons success!')
}

function doBuildBundle(entry: string[], minify = false) {
  return build({
    plugins: [
      vue(),
      dts({
        tsconfigPath: tsConfigPath,
        outDir: [path.resolve(outputPath, 'types')],
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
            dir: outputPath,
            exports: undefined,
          },
          {
            format: 'cjs',
            dir: outputPath,
            exports: undefined,
          },
        ],
      },
    },
  })
}

async function doBuildIIFEBundle(entry: string[], minify = false) {
  const filename = `index.iife.${minify ? 'min.' : ''}js`
  await fs.emptyDir(path.resolve(outputPath, 'temp'))
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
          dir: path.resolve(outputPath, 'temp'),
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
  await fs.move(path.resolve(outputPath, 'temp', filename), path.resolve(outputPath, filename))
  await fs.remove(path.resolve(outputPath, 'temp'))
}
