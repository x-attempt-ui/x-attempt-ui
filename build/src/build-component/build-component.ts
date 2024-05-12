import path from 'node:path'
import { build } from 'vite'
import fsGlob from 'fast-glob'
import fs from 'fs-extra'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'vite-plugin-dts'
import { consola } from 'consola'
import { DIST_DIR, ES_DIR, LIB_DIR, usePath } from '../../utils/paths'

const {
  getRoot,
  getOutputPath,
  getTsConfigPath,
} = usePath('x-attempt-ui', 'build-component')

const root = getRoot()
const distDir = getOutputPath(DIST_DIR)
const esDir = getOutputPath(ES_DIR)
const libDir = getOutputPath(LIB_DIR)
const tsConfigPath = getTsConfigPath()

async function buildComponent() {
  consola.start('build component module...')

  await fs.emptyDir(distDir)
  await fs.emptyDir(esDir)
  await fs.emptyDir(libDir)
  const entry = [
    ...fsGlob.sync('**/*.{ts,vue}', {
      absolute: true,
      cwd: path.resolve(root, 'src'),
    }),
  ]

  await build({
    plugins: [
      vue(),
      vueJsx(),
      dts({
        tsconfigPath: tsConfigPath,
        outDir: [esDir, libDir],
        beforeWriteFile(filePath, content) {
          const isEsModule = filePath.includes('/es/')
          // vite-plugin-dts无法识别软连接路径，需要手动将其转化为正确的路径，由于插件
          // 只会转化一遍，第一次在生成es module产物时已经将软连接路径转为es产物对应的
          // 路径，在第二次生成lib产物时需要将es产物路径转化为正确的lib产物路径
          const finalContent = isEsModule
            ? content.replace('@x-attempt/ui/src', '@x-attempt/ui/es')
            : content.replace('x-attempt-ui/es', '@x-attempt/ui/lib')

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
            dir: esDir,
            exports: undefined,
            preserveModules: true,
            preserveModulesRoot: path.resolve(root, 'src'),
            entryFileNames: `[name].mjs`,
          },
          {
            format: 'cjs',
            dir: libDir,
            exports: 'named',
            preserveModules: true,
            preserveModulesRoot: path.resolve(root, 'src'),
            entryFileNames: `[name].js`,
          },
        ],
      },
    },
  })

  await build({
    plugins: [
      vue(),
      vueJsx(),
    ],
    build: {
      minify: true,
      sourcemap: true,
      lib: {
        entry: path.resolve(root, 'src/index.ts'),
        name: 'XAttemptUI',
        formats: ['iife'],
        fileName: () => 'index.js',
      },
      rollupOptions: {
        external: ['vue'],
        treeshake: true,
        output: {
          dir: distDir,
          globals: {
            vue: 'Vue',
          },
          exports: 'named',
        },
      },
    },
  })

  consola.success('build component module success!')
}

export default buildComponent
