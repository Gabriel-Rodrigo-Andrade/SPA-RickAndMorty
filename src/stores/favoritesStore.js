import { defineStore } from 'pinia'

const LS_KEY = 'ram_favorites_ids_v1'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem(LS_KEY) || '[]')
  }),
  getters: {
    isFavorite: (state) => (id) => state.favorites.includes(id)
  },
  actions: {
    save() {
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(this.favorites))
      } catch (e) {
        console.error('Failed to save favorites to localStorage', e)
      }
    },
    addFavorite(id) {
      if (id == null) return
      if (!this.favorites.includes(id)) {
        this.favorites.push(id)
        this.save()
      }
    },
    removeFavorite(id) {
      const prevLen = this.favorites.length
      this.favorites = this.favorites.filter(f => f !== id)
      if (this.favorites.length !== prevLen) this.save()
    },
    toggleFavorite(id) {
      if (id == null) return
      if (this.favorites.includes(id)) this.removeFavorite(id)
      else this.addFavorite(id)
    }
  }
})

export default useFavoritesStore