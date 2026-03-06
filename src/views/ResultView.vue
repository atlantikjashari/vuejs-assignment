<template>
  <div class="session-page">
    <div class="session-page__orbit" aria-hidden="true"></div>
    <div class="session-page__content result-layout" :class="{ 'result-visible': visible }">
      <section class="result-section">
        <h2 class="result-section__title">Your Score:</h2>
        <p class="result-section__badge">
          <span class="result-section__dot" aria-hidden="true"></span>
          You are almost ready!
        </p>
      </section>

      <section class="result-section">
        <h2 class="result-section__title">General Advice:</h2>
        <ol class="result-section__list">
          <li>Work on structuring your answers more clearly.</li>
          <li>Try to provide more specific examples from experience.</li>
          <li>Improve time management during problem-solving questions.</li>
          <li>Be more confident when explaining your thought process.</li>
        </ol>
      </section>

      <button type="button" class="result-share">
        Share Results
        <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const visible = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    visible.value = true
  })
})
</script>

<style scoped>
.result-layout {
  width: min(720px, 100%);
  text-align: left;
  opacity: 0;
  transform: translateY(18px);
  transition:
    opacity 0.7s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

.result-visible {
  opacity: 1;
  transform: translateY(0);
}

.result-section {
  margin-bottom: 32px;
}

.result-section__title {
  font-size: 30px;
  font-weight: 800;
  margin: 0 0 14px;
  color: rgba(255, 255, 255, 0.95);
  letter-spacing: -0.02em;
}

.result-section__badge {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
}

.result-section__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffb74d;
  box-shadow: 0 0 0 6px rgba(255, 183, 77, 0.2);
  flex-shrink: 0;
}

.result-section__list {
  margin: 12px 0 0;
  padding-left: 24px;
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.78);
}

.result-section__list li {
  margin-bottom: 4px;
}

.result-share {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.94);
  color: #0a0f10;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.result-share .btn-arrow {
  flex-shrink: 0;
}
</style>
