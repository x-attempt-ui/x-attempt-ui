import { resolve } from 'node:path'
import { build } from 'vite'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import vue from '@vitejs/plugin-vue'
import { createPath, distDir, root } from '../../utils/paths'

async function buildHooks() {
  consola.start('build icons...')

  await fs.emptyDir(distDir)
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
        tsconfigPath: createPath('./tsconfig.json'),
        outDir: [createPath(distDir, 'types')],
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
            dir: distDir,
            exports: undefined,
          },
          {
            format: 'cjs',
            dir: distDir,
            exports: undefined,
          },
        ],
      },
    },
  })
}

async function doBuildIIFEBundle(entry: string[], minify = false) {
  const filename = `index.iife.${minify ? 'min.' : ''}js`
  await fs.emptyDir(createPath(distDir, 'temp'))
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
          dir: createPath(distDir, 'temp'),
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
  await fs.move(createPath(distDir, 'temp', filename), createPath(distDir, filename))
  await fs.remove(createPath(distDir, 'temp'))
}

export default buildHooks
