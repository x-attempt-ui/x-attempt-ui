<script lang="ts" setup>
import { useNamespace } from '@x-attempt/hooks'
import type {
  ButtonProps,
} from './button'

defineOptions({
  name: 'XButton',
})

withDefaults(defineProps<ButtonProps>(), {})

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
