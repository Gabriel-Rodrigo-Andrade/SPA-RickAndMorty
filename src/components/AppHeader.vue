<template>
  <header class="site-header">
    <div class="container-header">

      <div class="logo-header">
        <router-link to="/">
          <img src="../assets/images/lg-ram.png" class="logo-rick" alt="main-logo" />
        </router-link>
      </div>

      <button class="menu-toggle" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>

      <nav class="menus-header" :class="{ active: isMenuOpen }" aria-label="Main navigation">
        <router-link to="/" class="nav-link" @click="closeMenu">Home</router-link>
        <router-link to="/personagens" class="nav-link" @click="closeMenu">Personagens</router-link>
        <router-link to="/favoritos" class="nav-link" @click="closeMenu">Favoritos</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<style scoped>
.site-header {
  background: rgba(0, 0, 0, 0.6);
  border-bottom: 1px solid #444444;
  padding: 10px 20px;
  position: relative;
  z-index: 50;
}

.container-header {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-header {
  display: flex;
  align-items: center;
}
.logo-rick {
  height: 100px;
  width: auto;
  display: block;
  transition: transform 0.2s ease;
}
.logo-rick:hover {
  transform: scale(1.05);
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 26px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 60;
}
.menu-toggle span {
  display: block;
  height: 3px;
  width: 100%;
  background: #fff;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}
.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}
.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

.menus-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.nav-link {
  color: #bbbbbb;
  font-size: 1.1rem;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  background: var(--magma-green);
  color: #ffffff;
  transform: translateY(-1px);
}

.nav-link.router-link-active {
  color: #ffffff;
  font-weight: 700;
  border-bottom: 2px solid #6B9B5D;
  padding-bottom: 0.15rem;
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .menus-header {
    position: absolute;
    top: 100%;
    right: 0;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    pointer-events: none;
  }

  .menus-header.active {
    max-height: 300px;
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    font-size: 1rem;
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .logo-rick {
    height: 60px;
  }
}
</style>