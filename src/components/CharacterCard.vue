<template>
  <router-link :to="`/personagem/${character.id}`" class="card-link">
    <article class="card">
      <div class="card-image">
        <img :src="character.image" :alt="character.name" />
      </div>

      <div class="card-body">
        <header class="card-header">
          <h3 class="card-title">{{ character.name }}</h3>
          <p class="card-subtitle">{{ character.species }} <span v-if="character.type">• {{ character.type }}</span></p>
        </header>

        <div class="card-grid">
          <div>
            <p class="card-label">Gênero</p>
            <p class="card-value">{{ character.gender }}</p>
          </div>
          <div>
            <p class="card-label">Status</p>
            <p class="status-row">
              <span :class="['status-badge', statusClassComputed]">{{ character.status }}</span>
            </p>
          </div>
          <div>
            <p class="card-label">Origem</p>
            <p class="card-value">{{ character.origin?.name }}</p>
          </div>
          <div>
            <p class="card-label">Local</p>
            <p class="card-value">{{ character.location?.name }}</p>
          </div>
        </div>

        <footer class="card-footer">
          <div class="episodes">Episódios: <span class="episodes-count">{{ episodeCount }}</span></div>
          <div class="first-ep">{{ firstEpisodeId ? `(1º ep: #${firstEpisodeId})` : '' }}</div>
        </footer>
      </div>
    </article>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  character: { type: Object, required: true }
})

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
</script>

<style scoped>
.card-link { display: block; text-decoration: none; }
.card {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  border-radius: 0.5rem;
  border: 1px solid #e5e7eb;
  background: #ffffff;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: transform .15s ease, box-shadow .15s ease;
}
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.08);
}

.card-image {
  width: 100%;
  height: 24rem;
  background: #f3f4f6; /* gray-100 */
  overflow: hidden;
}
.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}
.card-body {
  padding: 1rem;
  flex: 1 1 auto; /* faz o body preencher o espaço e empurra o footer pra baixo*/
  display: flex;
  flex-direction: column;
}

.card-header .card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827; /* gray-900 */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-subtitle {
  font-size: 0.875rem;
  color: #6b7280; /* gray-500 */
  margin-top: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-grid {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #374151; /* gray-700 */
}
.card-label { font-size: 0.75rem; color: #6b7280; }
.card-value { font-weight: 500; }

.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
}
.status-alive { background: #d1fae5; color: #065f46; }
.status-dead { background: #fee2e2; color: #991b1b; }
.status-unknown { background: #f3f4f6; color: #374151; }
.status-row { margin-top: 0.25rem; }

.card-footer {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
  font-size: 0.875rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.first-ep { font-size: 0.75rem; color: #6b7280; }
.episodes-count { font-weight: 600; }
</style>