import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CharactersList from "../pages/CharactersList.vue";
import FavoritesPage from "../pages/FavoritesPage.vue";
import CharacterDetail from "../pages/CharacterDetail.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/personagens',
    name: 'CharactersList',
    component: CharactersList
  },
  {
    path: '/favoritos',
    name: 'FavoritesPage',
    component: FavoritesPage
  },
  {
    path: '/personagem/:id',
    name: 'CharacterDetail',
    component: CharacterDetail,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router;