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

  await fs.emptyDir(createPath('publish'))
  await fs.emptyDir(createPath('publish/es'))
  await fs.emptyDir(createPath('publish/lib'))
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
        beforeWriteFile(filePath, content) {
          const isEsModule = filePath.includes('/es/')
          // vite-plugin-dts无法识别软连接路径，需要手动将其转化为正确的路径
          // 由于插件只会转化一遍，第一次在转化es module时已经将软连接路径转
          // 为es对应的路径，在第二次转化lib时需要再次将es路径转化为lib路径
          const finalContent = isEsModule
            ? content.replace('@x-attempt/ui/src', 'x-attempt-ui/es')
            : content.replace('x-attempt-ui/es', 'x-attempt-ui/lib')

          return {
            filePath,
            content: finalContent,
          }
        },
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
