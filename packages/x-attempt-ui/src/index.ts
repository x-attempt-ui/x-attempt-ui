import type { App } from 'vue'
import components from './components'

export * from './components'

function install(app: App) {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}

export default install
