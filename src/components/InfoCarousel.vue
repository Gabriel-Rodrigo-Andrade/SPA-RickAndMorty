<template>
  <div class="info-carousel">
    <button class="carousel-nav prev" @click="scrollPrev" aria-label="Anterior">‹</button>
    <div class="carousel-track" ref="carouselRef" tabindex="0" role="region" :aria-label="ariaLabel" @keydown="onKeydown">
      <template v-if="items && items.length">
        <div class="carousel-item" v-for="(it, idx) in items" :key="idx">
            <div class="carousel-copy">
              <strong>{{ it.title }}</strong>
              <p v-html="it.text"></p>
            </div>
            <div v-if="it.image" class="carousel-image">
              <img :src="it.image" :alt="it.alt || it.title" />
            </div>
        </div>
      </template>
      <slot v-else />
    </div>
    <button class="carousel-nav next" @click="scrollNext" aria-label="Próximo">›</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  items: { type: Array, default: () => [] },
  ariaLabel: { type: String, default: 'Carrossel de conteúdo' }
})

const carouselRef = ref(null)

function scrollNext () {
  const el = carouselRef.value
  if (!el) return
  const step = Math.round(el.clientWidth * 0.9)
  el.scrollBy({ left: step, behavior: 'smooth' })
}

function scrollPrev () {
  const el = carouselRef.value
  if (!el) return
  const step = Math.round(el.clientWidth * 0.9)
  el.scrollBy({ left: -step, behavior: 'smooth' })
}

function onKeydown (e) {
  if (e.key === 'ArrowRight') scrollNext()
  if (e.key === 'ArrowLeft') scrollPrev()
}
</script>

<style scoped>
.info-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.carousel-track {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  min-width: 0;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 1rem 0;
  flex: 1 1 auto;
}
.carousel-track:focus {
  outline: none;
}
.carousel-item {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,0.35);
  padding: 1rem;
  border-radius: 0.5rem;
  min-width: 100%;
  scroll-snap-align: start;
  color: var(--text-muted);
}
.carousel-copy {
  flex: 1 1 auto;
}
.carousel-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
  background: rgba(0,0,0,0.12);
  margin-top: 2rem;
}
.carousel-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.carousel-copy p { 
  margin: 0.5rem 0 0 0; 
  color: var(--text-muted); 
}
@media (min-width: 640px) {
  .carousel-item { 
    min-width: 48.4%;
  }
}
@media (min-width: 992px) {
  .carousel-item { 
    min-width: 49.3%;
  }
}
.carousel-nav {
  background: rgba(0,0,0,0.6);
  color: var(--text-color);
  border: none;
  padding: 0.5rem 0.7rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 1.25rem;
  z-index: 12; 
  flex: 0 0 auto; 
}
.carousel-nav:focus {
  outline: 2px solid rgba(255,255,255,0.12);
}

@media (max-width: 640px) {
  .info-carousel {
    overflow: visible;
  }

  .carousel-nav {
    padding: 0.4rem 0.5rem;
    font-size: 1rem;
  }

  .carousel-track {
    padding-right: 0.25rem; 
  }
}
</style>
