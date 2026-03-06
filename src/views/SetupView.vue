<template>
  <div class="setup">
    <!-- Left panel -->
    <aside class="setup__left">
      <div class="setup__left-content">
        <h2 class="setup__title">
          Set up your Job Interview Prep<br />
          to start practicing smarter
        </h2>
        <span class="setup__badge">
          <svg
            class="setup__badge-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Less then 3 min
        </span>

        <ol class="setup__steps">
          <li v-for="s in steps" :key="s.id" class="setup__step">
            <span class="setup__step-icon" :class="{ 'setup__step-icon--done': allStepsDone }">
              <svg
                v-if="allStepsDone"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <div>
              <strong class="setup__step-title">{{ s.title }}</strong>
              <p class="setup__step-desc">{{ s.desc }}</p>
            </div>
          </li>
        </ol>
      </div>
    </aside>

    <!-- Right panel -->
    <main class="setup__right">
      <div class="setup__right-content">
        <h1 class="setup__headline">
          Prepare for your next<br />
          job interview with confidence
        </h1>
        <p class="setup__lead">
          Paste a public job posting link below and we'll create personalized interview scenarios
          based on the role, helping you practice, get feedback, and track your progress over time.
        </p>

        <div v-if="showLinkError" class="setup__notice" role="alert">
          <span class="setup__notice-dot"></span>
          <p class="setup__notice-text">
            We couldn't retrieve the data from the link you shared. Could you please
            <strong>copy and paste the job description text instead?</strong>
          </p>
        </div>

        <div class="setup__field">
          <label v-if="!showLinkError" class="setup__label" for="job-link">
            Enter a publicly available job link to get started
          </label>
          <label v-else class="setup__label" for="job-desc"> Paste here description text </label>

          <div v-if="!showLinkError" class="setup__input-wrap">
            <svg
              class="setup__input-icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"
              />
            </svg>
            <input
              id="job-link"
              v-model="jobLink"
              type="url"
              class="setup__input"
              placeholder="Paste link here"
            />
          </div>
          <textarea
            v-else
            id="job-desc"
            v-model="jobDescription"
            class="setup__textarea"
            placeholder="Paste"
            rows="7"
          />
        </div>

        <button type="button" class="setup__cta" @click="generateScenarios">
          Generate Interview Scenarios
        </button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const jobLink = ref('')
const jobDescription = ref('')
const showLinkError = ref(false)

const allStepsDone = computed(() => showLinkError.value)

const steps = [
  {
    id: 'link',
    title: 'Paste your job posting link',
    desc: "We'll extract key information about the role and company.",
  },
  {
    id: 'focus',
    title: 'Set your focus areas',
    desc: "Choose what you'd like to practice, soft skills, technical, or tricky questions.",
  },
  {
    id: 'scenarios',
    title: 'Get your interview scenarios',
    desc: "We'll generate realistic practice interviews tailored to the position.",
  },
  {
    id: 'session',
    title: 'Start your first session',
    desc: 'Run the scenario, get instant feedback, and track your progress.',
  },
] as const

function generateScenarios() {
  if (!showLinkError.value) {
    showLinkError.value = true
    return
  }
  router.push('/welcome')
}
</script>

<style scoped>
.setup {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  min-height: calc(100vh - 96px);
  background: #fff;
}

.setup__left {
  background: #f9f9f9;
  border-right: 1px solid #e5e7eb;
  padding: 48px 40px 48px 48px;
}

.setup__left-content {
  width: 100%;
  max-width: 400px;
  padding-left: 50px;
}

.setup__title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 20px;
  line-height: 1.35;
}

.setup__badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 999px;
  background: #042223;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
}

.setup__badge-icon {
  flex-shrink: 0;
}

.setup__steps {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  position: relative;
}

.setup__steps::before {
  content: '';
  position: absolute;
  left: 19px;
  top: 32px;
  bottom: 28px;
  border-left: 2px dashed #cdd0d4;
}

.setup__step {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 16px;
  padding: 16px 0;
  position: relative;
}

.setup__step-icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #e8eaec;
  border: 1px solid #d1d5db;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  color: transparent;
  flex-shrink: 0;
}

.setup__step-icon--done {
  background: #042223;
  border-color: #042223;
  color: #fff;
}

.setup__step-title {
  font-size: 15px;
  font-weight: 700;
  color: #111827;
  display: block;
  margin-bottom: 4px;
}

.setup__step-desc {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

.setup__right {
  background: #fff;
  padding: 48px 48px 48px 64px;
}

.setup__right-content {
  width: 100%;
  max-width: 600px;
}

.setup__headline {
  font-size: 42px;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.5px;
  color: #111827;
  margin: 0 0 20px;
}

.setup__lead {
  font-size: 16px;
  line-height: 1.65;
  color: #6b7280;
  margin: 0 0 32px;
}

.setup__notice {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  padding: 14px 18px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  margin-bottom: 24px;
}

.setup__notice-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
  flex-shrink: 0;
  margin-top: 5px;
}

.setup__notice-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: #dc2626;
}

.setup__notice-text strong {
  font-weight: 700;
}

.setup__field {
  margin-bottom: 12px;
}

.setup__label {
  display: block;
  font-size: 15px;
  color: #374151;
  margin-bottom: 10px;
  font-weight: 500;
}

.setup__input-wrap {
  position: relative;
}

.setup__input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.setup__input {
  width: 100%;
  height: 52px;
  border-radius: 12px;
  padding: 0 18px 0 46px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  font-size: 15px;
  outline: none;
}

.setup__input::placeholder {
  color: #9ca3af;
}

.setup__input:focus {
  border-color: #042223;
  box-shadow: 0 0 0 3px rgba(13, 79, 79, 0.1);
}

.setup__textarea {
  width: 100%;
  min-height: 180px;
  border-radius: 12px;
  padding: 16px 18px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  font-size: 15px;
  outline: none;
  resize: vertical;
  font-family: inherit;
}

.setup__textarea::placeholder {
  color: #9ca3af;
}

.setup__textarea:focus {
  border-color: #042223;
  box-shadow: 0 0 0 3px rgba(13, 79, 79, 0.1);
}

.setup__cta {
  margin-top: 28px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 26px;
  border-radius: 10px;
  border: none;
  background: #1f2937;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease;
}

.setup__cta:hover {
  background: #111827;
}

.setup__cta:active {
  transform: translateY(1px);
}

@media (max-width: 860px) {
  .setup {
    grid-template-columns: 1fr;
  }
  .setup__left {
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
    padding: 32px 24px;
  }
  .setup__left-content {
    max-width: none;
    padding-left: 0;
  }
  .setup__right {
    padding: 32px 24px;
  }
  .setup__right-content {
    max-width: none;
  }
  .setup__headline {
    font-size: 28px;
  }
}
</style>
