import { build } from 'vite'
import { glob } from 'fast-glob'
import fs from 'fs-extra'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import { createPath, esDir, libDir, srcDir } from '../../utils/paths'

async function buildComponent() {
  consola.start('build component module...')

  await fs.emptyDir(createPath('es'))
  await fs.emptyDir(createPath('lib'))
  const entry = [
    ...glob
      .sync('**/*.{ts,vue}', {
        absolute: true,
        cwd: srcDir,
      }),
  ]

  await build({
    plugins: [
      vue(),
      vueJsx(),
      dts({
        tsconfigPath: createPath('./tsconfig.json'),
        outDir: [createPath(esDir), createPath(libDir)],
      }),
    ],
    build: {
      minify: false,
      sourcemap: true,
      lib: {
        entry,
      },
      rollupOptions: {
        external: ['vue'],
        treeshake: true,
        output: [
          {
            format: 'esm',
            dir: createPath(esDir),
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: srcDir,
            entryFileNames: `[name].mjs`,
          },
          {
            format: 'cjs',
            dir: createPath(libDir),
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: srcDir,
            entryFileNames: `[name].js`,
          },
        ],
      },
    },
  })

  consola.success('build component module success!')
}

export default buildComponent
