<script setup>
import AppHeader from './components/AppHeader.vue';

</script>

<template>
  <AppHeader />
  <div>
    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
      Login
    </button>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
