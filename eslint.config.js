import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/block-order': ['off'],
    },
  },
  stylistic: {
    overrides: {
      'style/eol-last': ['warn'],
    },
  },
}, {
  ignores: ['packages/x-attempt-icons/components/*.vue'],
})
