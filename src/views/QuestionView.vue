<template>
  <div class="session-page session-page--question">
    <div class="session-page__orbit" aria-hidden="true"></div>
    <div class="question-bg-glow" :style="bgGlowStyle" aria-hidden="true"></div>

    <div class="session-page__content question-layout">
      <div class="question-progress" :class="{ 'fade-out': leaving }">
        <div class="question-progress__track">
          <div class="question-progress__fill" :style="{ width: progress + '%' }"></div>
        </div>
        <p class="question-progress__label">{{ progress }}% completed</p>
      </div>

      <div class="question-orb-row" :class="{ 'fade-out': leaving }">
        <InterviewCircle />
        <span class="session-page__talk-label">Talk To Answers</span>
      </div>

      <div class="question-qa-wrapper" :class="{ 'fade-out': leaving }">
        <Transition name="qa-slide" mode="out-in">
          <div class="question-qa" :key="currentIndex">
            <p class="question-qa__number">Question {{ currentIndex + 1 }}:</p>
            <h2 class="question-qa__text">{{ questionDisplayed }}</h2>
            <p v-if="showAnswer" class="question-qa__answer">
              <TypewriterText :text="currentAnswer" :word-delay="90" :key="'a-' + currentIndex" />
            </p>
          </div>
        </Transition>
      </div>

      <div class="question-actions" :class="{ 'fade-out': leaving }">
        <Transition name="btn-slide">
          <button
            v-if="buttonVisible"
            type="button"
            class="question-actions__btn"
            :disabled="transitioning"
            @click="goNext"
          >
            {{ isLastQuestion ? 'Submit' : 'Continue' }}
            <svg
              class="btn-arrow"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useInterviewSession } from '../composables/useInterviewSession'
import { useTypewriter } from '../composables/useTypewriter'
import InterviewCircle from '../components/InterviewCircle.vue'
import TypewriterText from '../components/TypewriterText.vue'

const BUTTON_INITIAL_DELAY_MS = 500
const BUTTON_REAPPEAR_DELAY_MS = 400
const LEAVE_TRANSITION_MS = 700
const QA_TRANSITION_MS = 600

const BG_GLOW_OFFSETS = [
  'translate(10%, -20%)',
  'translate(-5%, -10%)',
  'translate(5%, -25%)',
] as const

const router = useRouter()
const { currentIndex, currentQuestion, isLastQuestion, progress, nextQuestion } =
  useInterviewSession()

const questionText = computed(() => currentQuestion.value.question)
const currentAnswer = computed(() => currentQuestion.value.answer)

const transitioning = ref(false)
const buttonVisible = ref(false)
const showAnswer = ref(false)
const leaving = ref(false)

const bgGlowStyle = computed(() => ({
  transform: BG_GLOW_OFFSETS[currentIndex.value] ?? BG_GLOW_OFFSETS[0],
}))

const { displayed: questionDisplayed, isComplete: questionDone } = useTypewriter(questionText, {
  wordDelay: 120,
})

onMounted(() => {
  setTimeout(() => {
    buttonVisible.value = true
  }, BUTTON_INITIAL_DELAY_MS)
})

watch(questionDone, (done) => {
  if (done && questionText.value) showAnswer.value = true
})

watch(questionText, () => {
  showAnswer.value = false
  buttonVisible.value = false
  setTimeout(() => {
    buttonVisible.value = true
  }, BUTTON_REAPPEAR_DELAY_MS)
})

function goNext() {
  if (transitioning.value) return

  if (isLastQuestion.value) {
    transitioning.value = true
    leaving.value = true
    setTimeout(() => router.push('/result'), LEAVE_TRANSITION_MS)
    return
  }

  transitioning.value = true
  buttonVisible.value = false
  nextTick(() => {
    nextQuestion()
    setTimeout(() => {
      transitioning.value = false
    }, QA_TRANSITION_MS)
  })
}
</script>

<style scoped>
.session-page--question {
  justify-content: flex-start;
  padding-top: 24px;
  padding-bottom: 0;
}

.session-page--question .session-page__orbit::before {
  top: 25%;
  transform: translate(-50%, -50%);
}

.session-page--question .session-page__orbit::after {
  top: 25%;
  transform: translate(-50%, -50%);
}

.question-bg-glow {
  position: absolute;
  left: 60%;
  top: 18%;
  width: 900px;
  height: 600px;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(40, 120, 120, 0.18), transparent);
  pointer-events: none;
  z-index: 0;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.question-layout {
  width: min(780px, 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 120px);
}

.fade-out {
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
  opacity: 0;
  transform: translateY(-12px);
  pointer-events: none;
}

.question-progress {
  max-width: 600px;
  margin: 0 auto 24px;
  width: 100%;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.question-progress__track {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  position: relative;
}

.question-progress__fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(29, 183, 178, 0.6), rgba(140, 240, 235, 0.95));
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.question-progress__fill::after {
  content: '';
  position: absolute;
  right: -2px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(200, 255, 250, 0.9);
  box-shadow:
    0 0 8px 2px rgba(140, 240, 235, 0.7),
    0 0 20px 4px rgba(140, 240, 235, 0.3);
}

.question-progress__label {
  margin: 8px 0 0;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.72);
}

.question-orb-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.qa-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.qa-slide-leave-to {
  transform: translateY(40px);
  opacity: 0;
}

.qa-slide-enter-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.qa-slide-enter-from {
  opacity: 0;
}

.question-qa-wrapper {
  flex: 1;
  overflow-y: auto;
  position: relative;
  mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 70%, transparent 100%);
  padding-bottom: 40px;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.question-qa {
  text-align: left;
}

.question-qa__number {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.65);
}

.question-qa__text {
  margin: 0 0 18px;
  font-size: 28px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: rgba(255, 255, 255, 0.98);
}

.question-qa__answer {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.68);
  max-width: 65ch;
}

.question-actions {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-end;
  padding: 16px 0 32px;
  min-height: 76px;
  transition:
    opacity 0.6s ease,
    transform 0.6s ease;
}

.question-actions__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.94);
  color: #0a0f10;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}

.question-actions__btn:hover {
  background: #fff;
}

.question-actions__btn:active {
  transform: translateY(1px);
}

.question-actions__btn:disabled {
  opacity: 0.6;
  pointer-events: none;
}

.question-actions__btn .btn-arrow {
  flex-shrink: 0;
}

.btn-slide-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-slide-enter-from {
  transform: translateY(24px);
  opacity: 0;
}

.btn-slide-leave-active {
  transition: all 0.25s ease;
}

.btn-slide-leave-to {
  transform: translateY(16px);
  opacity: 0;
}
</style>
