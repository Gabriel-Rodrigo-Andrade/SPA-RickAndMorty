<template>
	<div class="container-header">
		<h1 class="tittle">Favoritados</h1>
		<p class="description">Personagens Favoritos:</p>

    <div class="container-list">
		  <ul class="order-list">
			  <!-- exemplo estático; substitua por dados reais -->
			  <li>
				  <router-link :to="`/personagem/1`" class="text-blue-600">Personagem 1</router-link>
			  </li>
			  <li>
				  <router-link :to="`/personagem/2`" class="text-blue-600">Personagem 2</router-link>
			  </li>
		  </ul>
    </div>
	</div>
</template>

<script setup>
// carregar dados reais via API aqui
</script>

<style scoped>
</style>
