<template>
  <main class="main-container">
    <div class="container">
      <div class="tittle-container">
        <h1>Favoritos</h1>
        <p>Personagens favoritados:</p>
      </div>

      <div class="favorite-container">
        <div class="liquid-glass-container">
          <div v-if="!favoritesIds || favoritesIds.length === 0" class="container-empty">
            <p>Nenhum favorito ainda. Favorite personagens na lista de personagens.</p>
          </div>
          <transition-group name="fav-list" tag="div" class="cards-grid" v-else>
            <div class="card-wrapper" v-for="char in characters" :key="char.id">
              <FavoriteCard :character="char" />
            </div>
          </transition-group>
        </div>
      </div>
    </div>
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
  margin: 0 auto;
  box-sizing: border-box;
}

.tittle-container h1 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0;
  color: var(--text-color);
}
.tittle-container p {
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.tittle-container {
  max-width: var(--container-max-width, 1100px);
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  width: 100%;
}
.main-container,
.favorite-container {
  padding: 0;
}
.liquid-glass-container {
  box-sizing: border-box;
  width: 100%;
  border-radius: 0.5rem;
  background: linear-gradient(1000deg, rgba(255,255,255,0.02), black);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  padding: 0.75rem;
  margin-bottom: 1.5rem;
  max-width: var(--container-max-width, 1100px); /* 💥 igual ao header */
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

@media (min-width: 991px) {
  .card-wrapper {
    flex: calc(50% - 1rem);
  }

}

@media (max-width: 640px) {
  .main-container {
    padding: 1rem 0;
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