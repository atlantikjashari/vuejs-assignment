<template>
  <div class="session-page welcome-page">
    <div class="session-page__orbit" aria-hidden="true"></div>
    <div class="session-page__content welcome-layout">
      <div class="session-page__center">
        <InterviewCircle />
        <span class="session-page__talk-label">Talk To Answers</span>
      </div>

      <div class="welcome__body">
        <p class="welcome__text">{{ welcomeDisplayed }}</p>

        <Transition name="welcome-fade">
          <button
            v-if="welcomeDone"
            type="button"
            class="welcome__continue"
            @click="goToQuestions"
          >
            Yes, Continue
            <svg class="welcome__arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
          </button>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useInterviewSession } from '../composables/useInterviewSession'
import { useTypewriter } from '../composables/useTypewriter'
import InterviewCircle from '../components/InterviewCircle.vue'

const router = useRouter()
const { resetSession } = useInterviewSession()

const welcomeText = ref(
  'Hi there!\nWelcome to your Field Marketing Interview Prep session. Ready to get started?',
)

const { displayed: welcomeDisplayed, isComplete: welcomeDone } = useTypewriter(welcomeText, {
  wordDelay: 80,
})

function goToQuestions() {
  resetSession()
  router.push('/question')
}
</script>

<style scoped>
.welcome-page {
  justify-content: flex-start;
  padding-top: 80px;
}

.welcome-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome__body {
  width: 100%;
  max-width: 520px;
  margin-top: 8px;
}

.welcome__text {
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 28px;
  text-align: left;
  white-space: pre-line;
  min-height: 80px;
}

.welcome__continue {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: transparent;
  color: rgba(255, 255, 255, 0.92);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.welcome__continue:hover {
  background: rgba(255, 255, 255, 0.06);
}

.welcome__arrow {
  flex-shrink: 0;
}

.welcome-fade-enter-active {
  transition: opacity 0.4s ease;
}

.welcome-fade-enter-from {
  opacity: 0;
}
</style>
