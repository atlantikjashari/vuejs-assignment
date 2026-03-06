<template>
  <header class="navbar">
    <div class="navbar__top">
      <div class="navbar__top-inner">
        <button
          v-for="tab in topTabs"
          :key="tab.id"
          type="button"
          class="navbar__tab"
          :class="{ 'navbar__tab--active': tab.active }"
        >
          {{ tab.label }}
        </button>
      </div>
    </div>
    <div class="navbar__main">
      <div class="navbar__main-inner">
        <div class="navbar__left">
          <RouterLink to="/" class="navbar__brand">
            <img src="@/assets/logo.png" alt="Learniverse" class="navbar__logo-img" />
            <span class="navbar__name">learniverse</span>
          </RouterLink>
          <nav class="navbar__links">
            <a href="#" class="navbar__link"
              >Solutions <span class="navbar__chevron">&#9662;</span></a
            >
            <a href="#" class="navbar__link">Plans</a>
            <a href="#" class="navbar__link">Why Learniverse?</a>
          </nav>
        </div>
        <button type="button" class="navbar__login">Login</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const topTabs = [
  { id: 'learners', label: 'For Learners', active: false },
  { id: 'trainers', label: 'For Trainers', active: false },
  { id: 'companies', label: 'For Companies', active: true },
  { id: 'universities', label: 'For Universities', active: false },
] as const
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar__top {
  background: #1a1f20;
}

.navbar__top-inner {
  padding: 6px 24px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.navbar__tab {
  padding: 6px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 999px;
  background: transparent;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}

.navbar__tab--active {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: #fff;
  font-weight: 600;
}

.navbar__main {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
}

.navbar__main-inner {
  padding: 0 40px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar__left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  cursor: pointer;
  margin-right: 24px;
}

.navbar__logo-img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  flex-shrink: 0;
}

.navbar__name {
  font-size: 18px;
  font-weight: 700;
  color: #0a0f10;
  letter-spacing: -0.02em;
}

.navbar__links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.navbar__link {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  text-decoration: none;
  white-space: nowrap;
}

.navbar__chevron {
  font-size: 15px;
  opacity: 0.5;
  margin-left: 2px;
}

.navbar__login {
  padding: 8px 22px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  background: #fff;
  color: #111827;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

@media (max-width: 768px) {
  .navbar__links {
    display: none;
  }
  .navbar__main-inner {
    padding: 0 16px;
  }
  .navbar__top-inner {
    padding: 6px 16px;
    flex-wrap: wrap;
  }
}
</style>
