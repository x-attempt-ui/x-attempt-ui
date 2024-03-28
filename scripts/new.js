import process from 'node:process'
import fs from 'fs-extra'

// 创建组件模板
createTemplate()

function createTemplate() {
  const [, , componentName, componentDesc = componentName] = process.argv
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
  createTemplateTemplate(name, componentDesc)
}

function createVueTemplate() {

}

function createSassTemplate() {

}

function createDocsTemplate() {

}

function createTemplateTemplate() {

}

function vueTemplate() {

}

function sassTemplate() {

}

function docsTemplate() {

}

function validateName(componentName) {
  const reg = /^[a-zA-Z]+?(-[a-zA-Z]+)?$/
  return reg.test(componentName)
}

function validateExist(componentName) {

}
