import type { App, Component } from 'vue'
import XButton from './components/button'

export {
  XButton,
}

const components: Component[] = [
  XButton,
]

function install(app: App) {
  components.forEach((component) => {
    app.component(component.name!, component)
  })
}

export default install
