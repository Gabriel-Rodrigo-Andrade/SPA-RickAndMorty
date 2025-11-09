<template>
  <section class="hero-banner" :style="bgStyle">
    <div class="hero-overlay" aria-hidden="true"></div>
    <div class="hero-inner">
      <div class="hero-copy">
        <h2 class="hero-title">Explore o universo de Rick & Morty</h2>
        <p class="hero-sub">Veja os personagens, episódios e locais — descubra curiosidades e detalhes.</p>
        <router-link to="/personagens" class="btn-load">
          <span class="btn-content">
            <span class="btn-text">Ver personagens</span>
          </span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import banner from '../assets/images/home-banner.png'
import { computed } from 'vue'

const bgStyle = computed(() => ({
  backgroundImage: `url(${banner})`
}))
</script>

<style scoped>

.hero-banner {
  position: relative;
  width: 100%;
  height: 35vw;
  min-height: 320px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.7));
  z-index: 0;
  pointer-events: none;
}

.hero-inner {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  padding: 2rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-copy {
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  max-width: 600px;
}

.hero-title {
  margin: 0;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
}

.hero-sub {
  margin: 0;
  color: var(--text-muted);
  font-size: 1rem;
  line-height: 1.4;
}

@media (max-width: 991px) {
  .hero-banner {
    height: 45vw;
  }
  .hero-copy {
    align-items: center;
    text-align: center;
  }
  .hero-title {
    font-size: 1.8rem;
  }
  .hero-sub {
    font-size: 0.95rem;
  }
}

@media (max-width: 640px) {
  .hero-banner {
    height: auto;
    min-height: 400px;
    padding: 3rem 1rem;
  }
  .hero-inner {
    flex-direction: column;
    text-align: center;
  }
  .hero-copy {
    align-items: center;
    gap: 0.75rem;
  }
  .hero-title {
    font-size: 1.4rem;
  }
  .hero-sub {
    font-size: 0.9rem;
  }
  .btn-load {
    font-size: 0.9rem;
    padding: 0.5rem 1.2rem;
    width: 30%;
  }
}
</style>
