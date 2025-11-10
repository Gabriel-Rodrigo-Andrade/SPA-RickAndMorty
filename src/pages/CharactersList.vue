<template>
	<main class="main-container">
    <div class="container-du-krl">
		  <div class="tittle-container">
		  	<h1>Personagens</h1>
		  	<p>Lista de personagens:</p>
		  </div>

      <div class="liquid-glass-container">
		    <div class="filters">
		    	<input v-model="filters.name" type="search" placeholder="Pesquisar por nome" class="filter-input" aria-label="Pesquisar por nome" />
		    	<select v-model="filters.status" class="filter-select" aria-label="Filtrar por status">
		    		<option value="">Status (Todos)</option>
		    		<option value="alive">Alive</option>
		    		<option value="dead">Dead</option>
		    		<option value="unknown">unknown</option>
		    	</select>
		    	  <input v-model="filters.species" type="search" placeholder="Espécie" class="filter-input" aria-label="Filtrar por espécie" />
		    	  <button type="button" class="btn-load btn-clean" @click="clearFilters">Limpar</button>
        </div>
		  </div>
      <div v-if="loading" class="container-loading">Carregando...</div>
		  <div v-else-if="error" class="container-error">Erro: {{ error }}</div>

		  	<div class="cards-grid" v-else>
		  		<div class="card-wrapper" v-for="char in characters" :key="char.id">
		  			<CharacterCard :character="char" />
		  		</div>
		  	</div>

		  			<div class="pagination" v-if="info">
		  				<button class="btn-load" :disabled="page <= 1 || loading" @click="prevPage">Anterior</button>
		  				<div class="page-info">Página {{ page }} de {{ info.pages || '?' }}</div>
		  				<button class="btn-load" :disabled="!info.next || loading" @click="nextPage">Próxima</button>
		  			</div>
    </div>
	</main>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue'
import api from '../services/api'
import CharacterCard from '../components/CharacterCard.vue'

const characters = ref([])
const loading = ref(false)
const error = ref(null)
const page = ref(1)
const info = ref(null)
const filters = ref({ name: '', status: '', species: '' })
let debounceTimer = null

async function loadCharacters (opts = { page: 1, append: false, filters: null }) {
	const currentPage = opts.page || 1
	const currentFilters = opts.filters || filters.value
	loading.value = true
	error.value = null
	try {
		const params = { page: currentPage }
		if (currentFilters.name) params.name = currentFilters.name
		if (currentFilters.status) params.status = currentFilters.status
		if (currentFilters.species) params.species = currentFilters.species

		const res = await api.get('/character', { params })
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
		characters.value = []
		info.value = null
	} finally {
		loading.value = false
	}
}

onMounted(() => {
				loadCharacters({ page: 1, append: false })
})

function applyFiltersDebounced () {
	if (debounceTimer) clearTimeout(debounceTimer)
	debounceTimer = setTimeout(() => {
		loadCharacters({ page: 1, append: false })
	}, 450)
}

watch(filters, () => applyFiltersDebounced(), { deep: true })

function clearFilters () {
	filters.value = { name: '', status: '', species: '' }
	loadCharacters({ page: 1, append: false })
}

function prevPage () {
	if (!info.value) return
	const prev = page.value - 1
	if (prev < 1) return
	loadCharacters({ page: prev, append: false })
}

function nextPage () {
	if (!info.value || !info.value.next) return
	const next = page.value + 1
	loadCharacters({ page: next, append: false })
}
</script>

<style scoped>
.main-container {
	max-width: 1100px;
	margin: 0 auto;
	padding: 1.5rem;
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
  color: var(--text-muted);
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

.liquid-glass-container {
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex-direction: column;
	flex: 0 0 auto;
	height: auto;
  border-radius: 0.5rem;
  background: linear-gradient(1000deg, rgba(255,255,255,0.02), black);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  margin-bottom: 14px;
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

.filters {
	display: flex;
	gap: 0.5rem;
	align-items: center;
	margin: 1rem 0;
	flex-wrap: wrap;
  padding: 1rem;
}
.filter-input {
	border-radius: 0.5rem;
	border: 1px solid rgba(255,255,255,0.06);
	background: transparent;
	color: var(--text-color);
	padding: 0.5rem 0.75rem;
	box-sizing: border-box;
}
.filter-select {
	padding: 0.5rem 0.75rem;
	border-radius: 0.5rem;
	border: 1px solid rgba(255,255,255,0.06);
	background: transparent;
	color: var(--text-color);
}
.pagination {
	display: flex;
	align-items: center;
	gap: 1rem;
	justify-content: center;
	margin: 1.25rem 0;
}
.page-info {
	color: var(--text-muted);
}


@media (max-width: 640px) {
	.filters {
		gap: 0.375rem;
		align-items: center;
		flex-wrap: wrap;
	}
	.filter-input,
	.filter-select {
		flex: 1 1 calc((33% - 0.75rem));
		min-width: 0;
		padding: 0.35rem 0.5rem;
		font-size: 0.85rem;
	}
	.filters .btn-load {
		display: flex;
    flex-direction: column;
		width: 100%;
		margin-top: 0.5rem;
	}
  .main-container {
    padding: 0.75rem;
  }
}

@media (max-width: 640px) {
	.load-more .btn-load {
		width: 50%;
	}
  .btn-clean {
    margin-bottom: 0%;
  }
}
</style>