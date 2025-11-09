<template>
  <main class="container-">
    <div v-if="loading" class="mt-6">Carregando...</div>
    <div v-else-if="error" class="mt-6 text-red-600">Erro: {{ error }}</div>
    <div v-else>
      <h1 class="text-2xl font-bold mt-8">{{ character.name }}</h1>
      <div class="mt-4 flex gap-6">
        <img :src="character.image" :alt="character.name" class="w-48 h-48 object-cover rounded" />
        <div>
          <p><strong>Espécie:</strong> {{ character.species }}</p>
          <p><strong>Status:</strong> {{ character.status }}</p>
          <p><strong>Gênero:</strong> {{ character.gender }}</p>
          <p><strong>Local:</strong> {{ character.location?.name }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const id = ref(route.params.id)

const character = ref(null)
const loading = ref(false)
const error = ref(null)

let controller = null

async function loadCharacter (characterId) {
  if (controller) {
    try { controller.abort() } catch (e) { /* ignore */ }
    controller = null
  }

  controller = new AbortController()
  loading.value = true
  error.value = null
  character.value = null
  try {
    const res = await api.get(`/character/${characterId}`, { signal: controller.signal })
    character.value = res.data
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

onMounted(() => {
  loadCharacter(id.value)
})

watch(() => route.params.id, (newId) => {
  id.value = newId
  loadCharacter(newId)
})

onUnmounted(() => {
  if (controller) {
    try { controller.abort() } catch (e) {}
    controller = null
  }
})
</script>

<style scoped>
</style>
