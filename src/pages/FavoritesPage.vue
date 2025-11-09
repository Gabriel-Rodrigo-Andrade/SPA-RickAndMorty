<template>
  <main class="main-container">
    <div class="tittle-container">
      <h1>Favoritos</h1>
      <p>Personagens favoritados:</p>
    </div>

    <div v-if="!favoritesIds || favoritesIds.length === 0" class="container-empty">
      <p>Nenhum favorito ainda. Favorite personagens na lista de personagens.</p>
    </div>

    <transition-group name="fav-list" tag="div" class="cards-grid" v-else>
      <div class="card-wrapper" v-for="char in characters" :key="char.id">
        <FavoriteCard :character="char" />
      </div>
    </transition-group>
  </main>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useFavoritesStore } from '../stores/favoritesStore'
import FavoriteCard from '../components/FavoriteCard.vue'
import api from '../services/api'

const store = useFavoritesStore()
const favoritesIds = computed(() => store.favorites)
const characters = ref([])

async function loadFavoritesCharacters (ids) {
  if (!ids || ids.length === 0) {
    characters.value = []
    return
  }
  try {
    const idsParam = ids.join(',')
    const res = await api.get(`/character/${idsParam}`)
    const data = res.data
    characters.value = Array.isArray(data) ? data : [data]
  } catch (err) {
    console.error('Failed to load favorite characters', err)
    characters.value = []
  }
}

watch(favoritesIds, (newIds) => {
  loadFavoritesCharacters(newIds)
}, { immediate: true })
</script>

<style scoped>
.main-container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;
}

.tittle-container h1 {
  font-size: 1.5rem;
  margin: 0;
  color: var(--text-color);
}
.tittle-container p {
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.container-empty {
  margin-top: 1rem;
  color: var(--text-muted);
  text-align: center;
}

.cards-grid {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-top: 1rem;
}

.card-wrapper {
  width: 100%;
}

.fav-list-enter-from,
.fav-list-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.985);
  will-change: opacity, transform;
}
.fav-list-enter-active,
.fav-list-leave-active {
  transition: opacity 320ms cubic-bezier(.2,.9,.2,1), transform 320ms cubic-bezier(.2,.9,.2,1);
}
.fav-list-enter-to,
.fav-list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.fav-list-move {
  transition: transform 360ms cubic-bezier(.2,.9,.2,1);
  will-change: transform;
}

.cards-grid > .card-wrapper {
  transition: opacity 220ms ease, transform 220ms ease, box-shadow 220ms ease;
}

@media (min-width: 640px) {
  .cards-grid {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  .card-wrapper {
    flex: 1 1 calc(50% - 1rem);
    max-width: 48%;
  }
}

@media (min-width: 992px) {
  .card-wrapper {
    flex: calc(50% - 1rem);
  }
}

@media (max-width: 639px) {
  .main-container {
    padding: 0.75rem;
  }
  .tittle-container h1 {
    font-size: 1.25rem;
    text-align: center;
  }
  .tittle-container p {
    text-align: center;
  }
  .cards-grid {
    gap: 10px;
  }
}
</style>