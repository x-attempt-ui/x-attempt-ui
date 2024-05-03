import { build } from 'vite'
import { glob } from 'fast-glob'
import fs from 'fs-extra'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import { createPath, distDir, root } from '../../utils/paths'

async function buildHooks() {
  consola.start('build hooks...')

  await fs.emptyDir(distDir)
  const entry = [
    ...glob
      .sync('**/*.ts', {
        absolute: true,
        cwd: root,
        ignore: ['bump.config.ts', 'node_modules'],
      }),
  ]

  await build({
    plugins: [
      dts({
        tsconfigPath: createPath('./tsconfig.json'),
        outDir: createPath(distDir, 'types'),
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
            dir: distDir,
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: root,
            entryFileNames: `[name].js`,
          },
        ],
      },
    },
  })

  consola.success('build hooks success!')
}

export default buildHooks
