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
				<button
					type="button"
					@click="loadMore"
					:disabled="loadingMore"
					:aria-busy="loadingMore"
					class="btn-load"
				>
					<span class="btn-content">
						<span v-if="loadingMore" class="spinner" aria-hidden="true"></span>
						<span class="btn-text">{{ loadingMore ? 'Carregando...' : 'Carregar mais' }}</span>
					</span>
				</button>
			</div>
	</main>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
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

async function loadMore () {
	if (!info.value || !info.value.next) return
	const nextPage = page.value + 1

	loadingMore.value = true

	await nextTick()

	await new Promise((resolve) => setTimeout(resolve, 2000))

	await loadCharacters({ page: nextPage, append: true })

	loadingMore.value = false
}
</script>

<style scoped>
.main-container {
	max-width: 1100px;
	margin: 0 auto;
	padding: 1rem;
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

.container-loading,
.container-error {
	margin-top: 1rem;
}
.container-error {
	color: var(--error-color);
}

.cards-grid {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 14px;
}

.card-wrapper {
	width: 100%;
}
@media (min-width: 768px) {
	.card-wrapper {
		width: calc(50% - 12px);
	}
}
@media (min-width: 992px) {
	.card-wrapper {
		width: calc(25% - 12px);
	}
}

@media (max-width: 640px) {
	.load-more .btn-load {
		width: 50%;
	}
}
</style>