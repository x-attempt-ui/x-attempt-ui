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
const entry = resolve(root, 'index.ts')
const outputPath = getOutputPath()
const tsConfigPath = getTsConfigPath()

buildIcons()

async function buildIcons() {
  consola.start('build icons...')

  await fs.emptyDir(outputPath)

  await doBuildBundle(false)
  await doBuildIIFEBundle()

  consola.success('build icons success!')
}

function doBuildBundle(minify = false) {
  return build({
    plugins: [
      vue(),
      dts({
        tsconfigPath: tsConfigPath,
        outDir: [path.resolve(outputPath, 'types')],
        exclude: ['scripts/**', 'node_modules/**'],
      }),
    ],
    build: {
      minify,
      sourcemap: false,
      lib: {
        entry,
        fileName: format => format === 'esm' ? 'index.esm.js' : 'index.cjs',
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

async function doBuildIIFEBundle() {
  await build({
    plugins: [
      vue(),
    ],
    build: {
      minify: true,
      emptyOutDir: false,
      sourcemap: false,
      lib: {
        entry,
        formats: ['iife'],
        name: 'XAttemptIcons',
        fileName: () => 'global.js',
      },
      rollupOptions: {
        external: ['vue'],
        treeshake: true,
        output: {
          dir: outputPath,
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
}
