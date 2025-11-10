<template>
  <div class="card-container">
    <article class="card">
      <div class="card-image">
        <img :src="character.image" :alt="character.name" />

        <button class="fav-btn" :class="{ favourited: isFav, toggled: justToggled }" @click.stop.prevent="toggleFav" :aria-pressed="isFav" :title="isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'">
          <svg v-if="isFav" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"/></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"/></svg>
        </button>
        <transition name="fav-feedback">
          <span v-if="showFavFeedback" class="fav-feedback">{{ isFav ? 'Adicionado' : 'Removido' }}</span>
        </transition>
      </div>

      <router-link :to="`/personagem/${character.id}`" class="card-link">
        <header class="card-header">
          <h3 class="card-title">{{ character.name }}</h3>
        </header>
        <div class="card-body">
          <div class="card-row">
            <p class="card-label">Espécie</p>
            <p class="card-value">{{ character.species }} <span v-if="character.type">• {{ character.type }}</span></p>
        </div>
          <div class="card-row">
            <p class="card-label">Gênero</p>
            <p class="card-value">{{ character.gender }}</p>
          </div>
          <div class="card-row">
            <p class="card-label">Status</p>
            <p>
              <span :class="['status-badge', statusClassComputed]">{{ character.status }}</span>
            </p>
          </div>
        </div>
        <footer class="card-footer">
            <div class="episodes">Episódios: <span class="episodes-count">{{ episodeCount }}</span></div>
            <div class="first-ep">{{ firstEpisodeId ? `(1º ep: #${firstEpisodeId})` : '' }}</div>
          </footer>
      </router-link>
    </article>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'

const props = defineProps({
  character: { type: Object, required: true }
})

const store = useFavoritesStore()

const episodeCount = computed(() => (props.character.episode ? props.character.episode.length : 0))

const firstEpisodeId = computed(() => {
  const ep = props.character.episode && props.character.episode[0]
  if (!ep) return null
  const parts = ep.split('/')
  return parts[parts.length - 1]
})

const statusClassComputed = computed(() => {
  const s = (props.character.status || '').toLowerCase()
  if (s === 'alive') return 'status-alive'
  if (s === 'dead') return 'status-dead'
  return 'status-unknown'
})

import { ref } from 'vue'

const isFav = computed(() => store.isFavorite(props.character.id))

const showFavFeedback = ref(false)
const justToggled = ref(false)

function toggleFav () {
  store.toggleFavorite(props.character.id)
  justToggled.value = true
  showFavFeedback.value = true
  setTimeout(() => { justToggled.value = false }, 380)
  setTimeout(() => { showFavFeedback.value = false }, 900)
}
</script>

<style scoped>
.card-link { 
  width: 100%; 
  text-decoration: none;
}

.card-container { 
  display: flex; 
  height: 100%; 
}
.card-container > .card-link { 
  display: flex; 
  flex: 1 1 auto; 
}

.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 0.5rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), black);
  color: var(--text-color);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: transform .15s ease, box-shadow .15s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.6);
}

.card-image {
  width: 100%;
  height: 16rem;
  background: linear-gradient(180deg, rgba(163,207,231,0.06), rgba(59,43,37,0.02));
  overflow: hidden;
  position: relative;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

.fav-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 9999px;
  background: rgba(0,0,0,0.45);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.06);
  cursor: pointer;
  transition: transform .12s ease, background .12s ease, color .12s ease;
  z-index: 5;
}
.fav-btn:hover {
  transform: scale(1.05);
}
.fav-btn.favourited {
  background: linear-gradient(90deg, #ffd166, #ffb703);
  color: #222222;
  border-color: rgba(0,0,0,0.08);
}
.fav-btn.toggled {
  animation: fav-pop 360ms cubic-bezier(.2,.9,.2,1);
}

@keyframes fav-pop {
  0% { transform: scale(1); }
  30% { transform: scale(1.18); }
  60% { transform: scale(0.98); }
  100% { transform: scale(1); }
}

.fav-feedback {
  position: absolute;
  top: 72px;
  right: 12px;
  background: rgba(0,0,0,0.6);
  color: #ffffff;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 0.85rem;
  white-space: nowrap;
  pointer-events: none;
}

.fav-feedback-enter-active, .fav-feedback-leave-active {
  transition: opacity 220ms ease, transform 220ms ease;
}
.fav-feedback-enter-from, .fav-feedback-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
.fav-feedback-enter-to, .fav-feedback-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.card-body {
  padding:20px;
  padding-top: 0%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
}

.card-header {
  color: var(--text-color);
  white-space: nowrap;
  padding: 20px;
  padding-top: 0%;
  padding-bottom: 0%;
}

.card-title {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-row {
  display: flex;
  align-items: center;
  gap: 10%;
}

.card-label {
  font-size: 0.9rem;
  color: var(--text-muted);

}
.card-value {
  font-size: 0.95rem;
  color: var(--text-color);
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 0;    
  max-width: 100%;
}

@media (max-width: 480px) {
  .card-grid {
    grid-template-columns: 1fr;
    gap: 0.25rem 0.5rem;
  }
  .card-grid > div {
    display: block;
  }
  .card-label {
    grid-column: auto; 
  }
  .card-value { 
    grid-column: auto; 
    justify-self: start; 
    text-align: left; 
  }
}

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}
.status-alive { 
  background: rgba(151,206,76,0.12); 
  color: var(--portal-green); 
  border: 1px solid rgba(151,206,76,0.18); 
}
.status-dead { 
  background: rgba(255,107,107,0.06); 
  color: var(--error-color); 
  border: 1px solid rgba(255,107,107,0.12); 
}
.status-unknown { 
  background: rgba(232,154,199,0.06); 
  color: var(--accent-pink); 
  border: 1px solid rgba(232,154,199,0.08); 
}

.card-footer {
  margin-top: 1rem;
  padding: 20px;
  padding-bottom: 5px;
  padding-top: 5px;
  font-size: 0.875rem;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.first-ep { 
  font-size: 0.75rem; 
  color: var(--text-muted); 
}
.episodes-count { 
  font-weight: 700; 
  color: var(--portal-cyan); 
}
</style>