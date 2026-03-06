import { ref, computed } from 'vue'
import { questions, type Question } from '../mock/questions'

const PROGRESS_STEPS: Record<number, number> = { 0: 20, 1: 32, 2: 57 }

const currentIndex = ref(0)

export function useInterviewSession() {
  const total = questions.length

  const currentQuestion = computed<Question>(() => questions[currentIndex.value]!)

  const isLastQuestion = computed(() => currentIndex.value === total - 1)

  const progress = computed(() =>
    PROGRESS_STEPS[currentIndex.value] ?? Math.round(((currentIndex.value + 1) / total) * 100),
  )

  function nextQuestion() {
    if (currentIndex.value < total - 1) {
      currentIndex.value++
    }
  }

  function resetSession() {
    currentIndex.value = 0
  }

  return {
    currentIndex,
    currentQuestion,
    isLastQuestion,
    progress,
    total,
    nextQuestion,
    resetSession,
  }
}
