import path from 'node:path'
import { build } from 'vite'
import fsGlob from 'fast-glob'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import { DIST_DIR, usePath } from '../../utils/paths'

const {
  getRoot,
  getOutputPath,
  getTsConfigPath,
} = usePath('x-attempt-hooks', 'build-hooks')
const root = getRoot()
const outputPath = getOutputPath()
const tsConfigPath = getTsConfigPath()

buildHooks()

async function buildHooks() {
  consola.start('build hooks...')

  await fs.emptyDir(outputPath)
  const entry = [
    ...fsGlob
      .sync('**/*.ts', {
        absolute: true,
        cwd: path.resolve(root, 'src'),
      }),
  ]

  await build({
    plugins: [
      dts({
        tsconfigPath: tsConfigPath,
        outDir: path.resolve(outputPath, 'types'),
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
            dir: outputPath,
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: path.resolve(DIST_DIR, 'src'),
            entryFileNames: `[name].js`,
          },
        ],
      },
    },
  })

  consola.success('build hooks success!')
}

export default buildHooks
