import process from 'node:process'
import { resolve } from 'node:path'
import { writeFileSync } from 'node:fs'
import fs from 'fs-extra'

// 创建组件模板
createTemplate()

function createTemplate() {
  const [, , componentName, componentDesc] = process.argv
  const isValidName = validateName(componentName)

  if (!isValidName) {
    console.warn('请输入合法的组件名称!')
    console.log('组件名称格式为英文小写，中间以 - 分割，例如: button-group')
    process.exit(-1)
  }

  const name = componentName.toLowerCase()
  const isExist = validateExist(name)

  if (isExist) {
    console.log('组件已存在，请检查组件库目录！')
    process.exit(-1)
  }

  createVueTemplate(name, componentDesc)
  createSassTemplate(name)
  createDocsTemplate(name, componentDesc)
  updateIndex(name)
}

function createVueTemplate(componentName) {
  const vueTpl = vueTemplate(componentName)
  const vueTypeTpl = vueTypeTemplate(componentName)
  const vueIndexTpl = vueIndexTemplate(componentName)
  const vueCompDir = resolve(process.cwd(), `packages/x-attempt-ui/src/components/${componentName}`)
  const vueCompPath = resolve(vueCompDir, 'src')
  const vueFilePath = resolve(vueCompPath, `${componentName}.vue`)
  const typeFilePath = resolve(vueCompPath, `${componentName}.ts`)
  const indexFilePath = resolve(vueCompDir, `index.ts`)
  fs.emptyDirSync(vueCompPath)
  writeFileSync(vueFilePath, vueTpl, 'utf8')
  writeFileSync(typeFilePath, vueTypeTpl, 'utf8')
  writeFileSync(indexFilePath, vueIndexTpl)
}

function createSassTemplate(componentName) {
  const sassTpl = sassTemplate(componentName)
  const sourceDir = resolve(process.cwd(), 'packages/x-attempt-ui/src')
  const sassFileDir = resolve(sourceDir, `components/${componentName}/styles`)
  const sassFilePath = resolve(sassFileDir, 'index.scss')

  fs.emptyDirSync(sassFileDir)
  fs.writeFileSync(sassFilePath, sassTpl, 'utf8')
}

function createDocsTemplate(componentName, componentDesc) {
  const componentConfigPath = resolve(process.cwd(), 'docs/.vitepress/config/components.mts')
  const componentConfig = fs
    .readFileSync(componentConfigPath, 'utf8')
    .replace('export default [', '')
    .replace(']', '')
    .trimEnd()
  const compDesc = componentDesc || `${componentName.split('-').map(str => upperFirstChar(str)).join(' ')}组件`
  const newCompConfig = `{ text: '${compDesc}', link: '/component/${componentName}' },`
  const componentConfigTpl = `export default [${componentConfig}\n  ${newCompConfig}\n]`
  const componentTpl = `# ${compDesc}\n${compDesc}的说明\n## 基础用法`

  // 创建组件目录配置
  writeFileSync(componentConfigPath, componentConfigTpl)
  // 创建组件markdown文件
  const componentPath = resolve(process.cwd(), `docs/component/${componentName}.md`)
  writeFileSync(componentPath, componentTpl)
}

function updateIndex(componentName) {
  const sourceDir = resolve(process.cwd(), 'packages/x-attempt-ui/src')
  const sassIndexFilePath = resolve(sourceDir, 'index.scss')
  const sassIndexTpl = sassIndexTemplate(componentName)
  const componentIndexFilePath = resolve(sourceDir, 'components/index.ts')
  const componentIndexTpl = componentIndexTemplate(componentName)

  // 创建样式出口文件
  writeFileSync(sassIndexFilePath, sassIndexTpl, 'utf8')

  // 创建组件出口文件
  writeFileSync(componentIndexFilePath, componentIndexTpl, 'utf8')
}

function vueTemplate(componentName) {
  const camelCaseName = getCamelCaseName(componentName)
  const propOption = `${camelCaseName}Props`
  const compName = `X${camelCaseName}`

  return `<script lang="ts" setup>
import { useNamespace } from '@x-attempt/hooks'
import type {
  ${propOption},
} from './${componentName}'

defineOptions({
  name: '${compName}',
})

withDefaults(defineProps<${propOption}>(), {})

const ns = useNamespace('${componentName}')
</script>

<template>
  <div
    :class="[
      ns.b(),
    ]"
  >
    ${camelCaseName}
  </div>
</template>
  `
}

function vueTypeTemplate(componentName) {
  const propTypeName = `${getCamelCaseName(componentName)}Props`
  return `export interface ${propTypeName} {

}`
}

function vueIndexTemplate(componentName) {
  const camelCaseName = getCamelCaseName(componentName)
  const compName = `X${camelCaseName}`

  return `import { withInstall } from '@x-attempt/ui/src/utils'
import ${camelCaseName} from './src/${componentName}.vue'

export const ${compName} = withInstall(${camelCaseName})
export default ${compName}
`
}

function sassTemplate(componentName) {
  return `@use "../../../styles/mixins/mixins.scss" as *;
@use "../../../styles/common/var.scss" as *;

@include b(${componentName}) {
}
`
}

function sassIndexTemplate(componentName) {
  const sourceDir = resolve(process.cwd(), 'packages/x-attempt-ui/src')
  const sassIndexFilePath = resolve(sourceDir, 'index.scss')
  const sassIndexFileContent = fs.readFileSync(sassIndexFilePath, 'utf8')
  return `${sassIndexFileContent}\n@import "components/${componentName}/styles/index.scss";`
}

function componentIndexTemplate(componentName) {
  const name = `X${getCamelCaseName(componentName)}`
  const sourceDir = resolve(process.cwd(), 'packages/x-attempt-ui/src')
  const componentIndexPath = resolve(sourceDir, 'components/index.ts')
  const componentIndexContent = fs.readFileSync(componentIndexPath, 'utf8')
  const [importContent, exportContent, defaultExportContent] = componentIndexContent.split(/(?:\/\/ export components)|(?:\/\/ export component array)/g)
  const newImportContent = `${importContent.trim()}\nimport ${name} from './${componentName}'`
  const newExportContent = exportContent.replace('}', `  ${name},\n}`).trim()
  const newDefaultExportContent = defaultExportContent.replace(']\nexport', `  ${name},\n]\nexport`).trim()
  return `${newImportContent}\n
// export components
${newExportContent}\n
// export component array
${newDefaultExportContent}\n
`
}

function validateName(componentName) {
  const reg = /^[a-zA-Z]+?(-[a-zA-Z]+)?$/
  return componentName && reg.test(componentName)
}

function validateExist(componentName) {
  const path = resolve(process.cwd(), `packages/x-attempt-ui/src/components/${componentName}`)
  return fs.pathExistsSync(path)
}

function getCamelCaseName(componentName) {
  return componentName.split('-').reduce((compName, str) => {
    compName += upperFirstChar(str)
    return compName
  }, '')
}

function upperFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1)
}
