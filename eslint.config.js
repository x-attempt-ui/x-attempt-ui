import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/block-order': ['off'],
    },
  },
}, {
  ignores: ['packages/x-attempt-icons/components/*.vue'],
})
