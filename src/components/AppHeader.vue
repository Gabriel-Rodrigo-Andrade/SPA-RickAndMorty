<template>
  <header class="site-header">
    <div class="container-header">

      <div class="logo-header">
        <router-link to="/">
          <img src="../assets/images/lg-rick-3.png" class="logo-rick" alt="main-logo" />
        </router-link>
      </div>

      <div class="menus-header">
        <nav class="nav-links" aria-label="Main navigation">
          <router-link to="/" class="nav-link no-underline">Home</router-link>
          <router-link to="/personagens" class="nav-link no-underline">Personagens</router-link>
          <router-link to="/favoritos" class="nav-link no-underline">Favoritos</router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.site-header {
  border-bottom: 1px solid #e6e7eb;
  background: #ffffff;
}
.container-header {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.logo-header {
  display: flex;
  align-items: center; 
}
.logo-rick {
  height: 108px;
  width: auto;
  display: block;
}
.menus-header {
  display: flex;
  align-items: center;
}
.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 18px;
}
.nav-link {
  color: #374151;
  padding: 0.35rem 0.6rem;
  border-radius: 0.375rem;
  transition: background .12s ease, color .12s ease;
}
.nav-link:hover {
  transform: translateX(-6px);
  box-shadow: #111827;
}
.nav-link.router-link-active {
  font-weight: 600;
  border-bottom: 2px solid #97ce4c;
  padding-bottom: 0.15rem;
}
@media (max-width: 639px) {
  .container-header { flex-direction: column; align-items: flex-start; }
  .nav-links { margin-top: 0.5rem; }
}
</style>