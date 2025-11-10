<template>
  <main class="main-container">
    <div class="controls">
      <button class="btn-back" @click="goBack">← Voltar</button>
    </div>
    <div class="liquid-glass-container">
      <div v-if="loading" class="loading">Carregando...</div>
      <div v-else-if="error" class="error">Erro: {{ error }}</div>
      <div v-else-if="character">
        <div class="detail-header">
          <h1 class="detail-title">{{ character.name }}</h1>
          <div class="detail-actions">
            <button class="fav-btn" :class="{ favourited: isFav, toggled: justToggled }" @click="toggleFav" :aria-pressed="isFav">
              <svg v-if="isFav" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"/></svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 17.3l6.18 3.73-1.64-7.03L21 9.24l-7.19-.62L12 2 10.19 8.62 3 9.24l4.46 4.76L5.82 21z"/></svg>
            </button>
            <transition name="fav-feedback">
              <span v-if="showFavFeedback" class="fav-feedback">{{ isFav ? 'Adicionado aos favoritos' : 'Removido dos favoritos' }}</span>
            </transition>
          </div>
        </div>

        <div class="detail-main">
          <img :src="character.image" :alt="character.name" class="character-image" />
          <div class="detail-info">
            <p v-if="createdAt"><strong>Criado: </strong> {{ createdAt }}</p>
            <p><strong>Local: </strong> {{ character.location?.name }}</p>
            <p><strong>Espécie: </strong> {{ character.species }}</p>
            <p><strong>Gênero: </strong> {{ character.gender }}</p>
            <p><strong>Status: </strong> {{ character.status }}</p>
          </div>
        </div>

        <section class="episodes-section" v-if="episodes && episodes.length">
          <h2>Episódios</h2>
          <div class="liquid-glass-container">
            <ul class="episodes-list">
              <li v-for="ep in episodes" :key="ep.id">
                <a :href="`https://rickandmortyapi.com/api/episode/${ep.id}`" target="_blank" rel="noopener noreferrer">{{ ep.episode }} — {{ ep.name }}</a>
              </li>
            </ul>
          </div>
        </section>
      </div> 
      <div v-else class="error">Personagem não carregado.</div>
    </div>
    <div aria-live="polite" class="sr-only">{{ liveMessage }}</div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFavoritesStore } from '../stores/favoritesStore'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const store = useFavoritesStore()

const id = ref(route.params.id)

const character = ref(null)
const loading = ref(false)
const error = ref(null)
const episodes = ref([])

const showFavFeedback = ref(false)
const justToggled = ref(false)
const liveMessage = ref('')

let controller = null

async function loadCharacter (characterId) {
  if (controller) {
    try { controller.abort() } catch (e) {  }
    controller = null
  }

  controller = new AbortController()
  loading.value = true
  error.value = null
  character.value = null
  try {
    const res = await api.get(`/character/${characterId}`, { signal: controller.signal })
    character.value = res.data
      loadEpisodesForCharacter(res.data)
  } catch (err) {
    if (err && (err.code === 'ERR_CANCELED' || err.name === 'CanceledError')) {
      return
    }
    if (err && err.response && err.response.status === 404) {
      error.value = 'Personagem não encontrado'
    } else {
      error.value = err.message || 'Erro ao carregar personagem'
    }
  } finally {
    loading.value = false
  }
}

async function loadEpisodesForCharacter (char) {
  episodes.value = []
  const eps = char.episode || []
  if (!eps.length) return
  const ids = eps.map(u => u.split('/').pop()).filter(Boolean)
  try {
    const idsParam = ids.join(',')
    const res = await api.get(`/episode/${idsParam}`)
    const data = res.data
    episodes.value = Array.isArray(data) ? data : [data]
  } catch (e) {
    console.error('Failed loading episodes', e)
    episodes.value = []
  }
}

onMounted(() => {
  loadCharacter(id.value)
})

watch(() => route.params.id, (newId) => {
  id.value = newId
  loadCharacter(newId)
})

const isFav = computed(() => store.isFavorite(Number(id.value)))

//Tive q converter essa data que vem tudo errada
const createdAt = computed(() => {
  const raw = character.value && character.value.created
  if (!raw) return ''
  try {
    const d = new Date(raw)
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
  } catch (e) {
    return raw
  }
})

function toggleFav () {
  const nid = Number(id.value)
  if (!nid) return
  store.toggleFavorite(nid)
  justToggled.value = true
  showFavFeedback.value = true
  liveMessage.value = store.isFavorite(nid) ? 'Personagem adicionado aos favoritos' : 'Personagem removido dos favoritos'
  setTimeout(() => { justToggled.value = false }, 380)
  setTimeout(() => { showFavFeedback.value = false; liveMessage.value = '' }, 900)
}

function goBack () {
  router.back()
}

onUnmounted(() => {
  if (controller) {
    try { controller.abort() } catch (e) {}
    controller = null
  }
})
</script>

<style scoped>
.main-container {
	max-width: 1100px;
	margin: 0 auto;
	padding: 1rem;
}

.controls {
  margin-top: 0.5rem;
}

.liquid-glass-container {
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 0.5rem;
  background: linear-gradient(1000deg, rgba(255,255,255,0.02), black);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  padding: 2em;
  margin-bottom: 2%;
}

.btn-back {
  background: linear-gradient(900deg, rgba(255,255,255,0.02), black);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  border-radius: 0.5rem;
  overflow: hidden;
  border: none;
  color: var(--text-color);
  padding: 0.5rem 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  font-weight: 600;
}

.btn-back:hover {
  transform: translateY(-2px);
}

.loading {
  margin-top: 1.5rem;
  color: var(--text-muted);
}

.error {
  margin-top: 1.5rem;
  color: var(--error-color);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem; 
}

.detail-title {
  font-size: 1.5rem; 
  font-weight: 700;
  margin: 0;
  color: var(--text-color);
}

.detail-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.detail-actions .fav-btn {
  position: static;
  top: auto;
  right: auto;
  transform: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}


.detail-main {
  margin-top: 1rem;
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.character-image {
  width: 12rem;
  height: 15rem;
  object-fit: cover;
  border-radius: 0.5rem;
}

.detail-info p {
  margin: 0.2rem 0;
  color: var(--text-muted);

}

.episodes-section {
  margin-top: 1.5rem;
}

.episodes-section h2 {
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
}

.episodes-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.episodes-list li {
  padding: 0.25rem 0;
}

@media (min-width: 768px) {
  .episodes-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem 1.5rem; 
  }
  .episodes-list li {
    padding: 0.25rem 0; 
  }
  .character-image {
  width: 24rem;
  height: 24rem;
  }
  .detail-info p {
  margin: 1.5rem 0;
  }
}

.episodes-list a {
  color: var(--text-muted);
  text-decoration: none;
}

.episodes-list a:hover {
  text-decoration: underline;
}

.sr-only {
  position: absolute !important;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
</style>
