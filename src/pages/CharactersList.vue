<template>
	<main class="main-container">
    <div class="tittle-container">
		  <h1>Personagens</h1>
		  <p>Lista de personagens:</p>
    </div>
		
    <div v-if="loading" class="container-loading">Carregando...</div>
		<div v-else-if="error" class="container-error">Erro: {{ error }}</div>

			<div class="cards-grid" v-else>
				<div class="card-wrapper" v-for="char in characters" :key="char.id">
					<CharacterCard :character="char" />
				</div>
			</div>

			<div class="load-more" v-if="info && info.next">
				<button @click="loadMore" :disabled="loadingMore" class="btn-load">
					<span v-if="!loadingMore">Carregar mais</span>
					<span v-else>Carregando...</span>
				</button>
			</div>
	</main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import CharacterCard from '../components/CharacterCard.vue'

const characters = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const error = ref(null)
const page = ref(1)
const info = ref(null)

async function loadCharacters (opts = { page: 1, append: false }) {
	const currentPage = opts.page || 1
	if (opts.append) loadingMore.value = true
	else loading.value = true
	error.value = null
	try {
		const res = await api.get('/character', { params: { page: currentPage } })
		const results = res.data.results || []
		if (opts.append) {
			characters.value = characters.value.concat(results)
		} else {
			characters.value = results
		}
		info.value = res.data.info || null
		page.value = currentPage
	} catch (err) {
		// Prefer more informative messages when available
		if (err.response && err.response.data && err.response.data.error) {
			error.value = err.response.data.error
		} else {
			error.value = err.message || 'Erro ao carregar personagens'
		}
	} finally {
		loading.value = false
		loadingMore.value = false
	}
}

onMounted(() => {
		loadCharacters({ page: 1, append: false })
})

function loadMore () {
	if (!info.value || !info.value.next) return
	const nextPage = page.value + 1
	loadCharacters({ page: nextPage, append: true })
}
</script>

<style scoped>
.main-container {
	max-width: 1100px;
	margin: 0 auto;
	padding: 1rem;
}

.tittle-container {
  h1 { font-size: 1.5rem; margin: 0; }
  p { color: #6b7280; margin-top: 0.25rem; }
}

.container-loading, .container-error { 
  margin-top: 1rem;
}
.container-error {
  color: #b91c1c;
}

.cards-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 1.5rem;
  align-items: stretch;
}

.card-wrapper { 
  display: flex;
  align-items: stretch;
}

.load-more {
  margin-top: 1rem;
}

.btn-load {
	display: inline-block;
	padding: 0.5rem 1rem;
	background: #2563eb; /* blue-600 */
	color: #ffffff;
	border-radius: 0.375rem;
	border: none;
	cursor: pointer;
}

.btn-load:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
	.cards-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .cards-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>