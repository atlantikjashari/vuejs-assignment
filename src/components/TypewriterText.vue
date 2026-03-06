<template>
  <span class="typewriter-text">{{ displayed }}</span>
</template>

<script setup lang="ts">
import { toRef } from 'vue'
import { useTypewriter } from '../composables/useTypewriter'

const props = withDefaults(
  defineProps<{
    text: string
    wordDelay?: number
    charDelay?: number
  }>(),
  { wordDelay: 70, charDelay: 0 }
)

const textRef = toRef(props, 'text')
const { displayed } = useTypewriter(textRef, {
  wordDelay: props.wordDelay,
  charDelay: props.charDelay,
  immediate: true,
})
</script>

<style scoped>
.typewriter-text {
  display: inline;
}
</style>
