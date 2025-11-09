<template>
  <article class="fav-card">
    <div class="fav-image">
      <img :src="character.image" :alt="character.name" />
      <button
        class="fav-btn"
        :class="{ favourited: isFav }"
        @click.stop.prevent="toggleFav"
        :aria-pressed="isFav"
        :title="isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
      >
        <svg v-if="isFav" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"/></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"/></svg>
      </button>
    </div>

    <div class="fav-body">
      <div class="fav-header">
        <h3>{{ character.name }}</h3>
        <div class="status"><span :class="['status-badge', statusClass]">{{ character.status }}</span></div>
      </div>

      <div class="fav-details">
        <div class="meta"><strong>Espécie:</strong> {{ character.species }} <span v-if="character.type">• {{ character.type }}</span></div>
        <div class="meta"><strong>Gênero:</strong> {{ character.gender }}</div>
        <div class="meta episodes">Episódios: <span class="episodes-count">{{ episodeCount }}</span></div>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'

const props = defineProps({
  character: { type: Object, required: true }
})

const store = useFavoritesStore()

const isFav = computed(() => store.isFavorite(props.character.id))

function toggleFav () {
  store.toggleFavorite(props.character.id)
}

const episodeCount = computed(() => (props.character.episode ? props.character.episode.length : 0))

const statusClass = computed(() => {
  const s = (props.character.status || '').toLowerCase()
  if (s === 'alive') return 'status-alive'
  if (s === 'dead') return 'status-dead'
  return 'status-unknown'
})
</script>

<style scoped>
.fav-card {
  display: flex;
  gap: 16px;
  align-items: center;
  padding: 20px;
  border-radius: 0.5rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.02), black);
  color: var(--text-color);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  transition: transform .15s ease, box-shadow .15s ease;
}
.fav-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(0,0,0,0.6);
}
.fav-image { position: relative; width: 140px; height: 140px; flex: 0 0 140px; border-radius: 6px; overflow: hidden; }
.fav-image img { width: 100%; height: 100%; object-fit: cover; display: block; }
.fav-body { flex: 1 1 auto; min-width: 0; }
.fav-header { display:flex; align-items:center; justify-content:space-between; gap:12px; }
.fav-header h3 { margin:0; color:var(--text-color); font-size:1.05rem; }
.fav-details { margin-top:8px; display:flex; gap:12px; flex-wrap:wrap; align-items:center; color:var(--text-muted); }
.meta { font-size:0.95rem; }
.episodes-count { font-weight:700; color:var(--portal-cyan); }
.status-badge { padding: 0.125rem 0.5rem; border-radius:9999px; font-size:0.75rem; font-weight:600; }
.status-alive { background: rgba(151,206,76,0.12); color: var(--portal-green); border: 1px solid rgba(151,206,76,0.18);} 
.status-dead { background: rgba(255,107,107,0.06); color: var(--error-color); border:1px solid rgba(255,107,107,0.12);} 
.status-unknown { background: rgba(232,154,199,0.06); color: var(--accent-pink); border:1px solid rgba(232,154,199,0.08);} 

.fav-btn { position:absolute; top:8px; right:8px; display:inline-flex; align-items:center; justify-content:center; width:34px; height:34px; border-radius:9999px; background:rgba(0,0,0,0.45); color:#fff; border:1px solid rgba(255,255,255,0.06); cursor:pointer; }
.fav-btn.favourited { background: linear-gradient(90deg,#ffd166,#ffb703); color:#222; border-color: rgba(0,0,0,0.08); }

@media (max-width: 640px) {
  .fav-card { flex-direction: row; gap: 12px; padding: 12px; }
  .fav-image { width: 96px; height: 96px; flex: 0 0 96px; }
}
</style>
