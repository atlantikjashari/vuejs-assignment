<template>
  <div class="interview-orb">
    <div class="interview-orb__glow"></div>
    <div class="interview-orb__bars" aria-hidden="true">
      <span v-for="i in 8" :key="i" class="interview-orb__bar"></span>
    </div>
  </div>
</template>

<style scoped>
.interview-orb {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    circle at 35% 35%,
    #72fff2 0%,
    #6b78ff 55%,
    rgba(20, 80, 90, 0.9) 100%
  );
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-shrink: 0;
}

.interview-orb::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0.5;
  pointer-events: none;
}

.interview-orb__glow {
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(114, 255, 242, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.interview-orb__bars {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  z-index: 1;
}

.interview-orb__bar {
  width: 4px;
  min-height: 12px;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.85);
  animation: orb-bar 0.6s ease-in-out infinite alternate;
}

.interview-orb__bar:nth-child(1) { animation-delay: 0ms; height: 28px; }
.interview-orb__bar:nth-child(2) { animation-delay: 80ms; height: 36px; }
.interview-orb__bar:nth-child(3) { animation-delay: 160ms; height: 24px; }
.interview-orb__bar:nth-child(4) { animation-delay: 240ms; height: 32px; }
.interview-orb__bar:nth-child(5) { animation-delay: 320ms; height: 30px; }
.interview-orb__bar:nth-child(6) { animation-delay: 400ms; height: 38px; }
.interview-orb__bar:nth-child(7) { animation-delay: 480ms; height: 26px; }
.interview-orb__bar:nth-child(8) { animation-delay: 560ms; height: 34px; }

@keyframes orb-bar {
  from { transform: scaleY(0.6); opacity: 0.8; }
  to { transform: scaleY(1); opacity: 1; }
}
</style>
