<script lang="ts" setup>
import { useNamespace } from '@x-attempt/hooks'

defineOptions({
  name: 'XButton',
})

const ns = useNamespace('button')
</script>

<template>
  <button
    :class="[
      ns.b(),
    ]"
  >
    <slot />
  </button>
</template>
