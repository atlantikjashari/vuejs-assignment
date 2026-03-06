import { type Ref, ref, watch, onScopeDispose } from 'vue'

export interface UseTypewriterOptions {
  wordDelay?: number
  charDelay?: number
  immediate?: boolean
}

export function useTypewriter(source: Ref<string>, options: UseTypewriterOptions = {}) {
  const { wordDelay = 80, charDelay = 0, immediate = true } = options
  const displayed = ref('')
  const isComplete = ref(false)
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function clearTimer() {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
  }

  function run() {
    const text = source.value ?? ''
    if (!text) {
      displayed.value = ''
      isComplete.value = true
      return
    }

    displayed.value = ''
    isComplete.value = false
    const words = text.split(/(\s+)/)

    let wordIndex = 0

    function tick() {
      if (wordIndex >= words.length) {
        isComplete.value = true
        return
      }

      const word = words[wordIndex] ?? ''
      if (charDelay > 0) {
        let charIndex = 0
        let currentSegment = ''
        const addChar = () => {
          if (charIndex < word.length) {
            currentSegment += word[charIndex]
            displayed.value = words.slice(0, wordIndex).join('') + currentSegment
            charIndex++
            timeoutId = setTimeout(addChar, charDelay)
          } else {
            wordIndex++
            timeoutId = setTimeout(tick, wordDelay)
          }
        }
        addChar()
      } else {
        displayed.value = words.slice(0, wordIndex + 1).join('')
        wordIndex++
        timeoutId = setTimeout(tick, wordDelay)
      }
    }

    timeoutId = setTimeout(tick, immediate ? 0 : wordDelay)
  }

  function reset() {
    clearTimer()
    displayed.value = ''
    isComplete.value = false
  }

  watch(
    source,
    () => {
      reset()
      if (source.value) run()
    },
    { immediate: true },
  )

  onScopeDispose(clearTimer)

  return { displayed, isComplete, run, reset }
}
