<template>
  <HeroBanner />
  <main class="container">
    <div class="liquid-glass-container">
      <div class="first-content">
        <h2>Sobre o Desenho</h2>
        <p>"Rick and Morty" é uma série de animação de comédia e ficção científica sobre as aventuras interdimensionais do cientista maluco Rick e seu neto Morty. A série é conhecida por misturar humor ácido, referências à cultura pop e explorações de temas filosóficos como niilismo, existencialismo e a indiferença do universo. A dinâmica entre o cínico Rick e seu neto, mais ingênuo, é o cerne da história, que aborda desde a moralidade até a insignificância do indivíduo em um multiverso infinito.</p>
        <InfoCarousel :items="aboutItems"/>
      </div>
    </div>
    <div class="liquid-glass-container">
      <div class="second-content">
        <h2>Personagens Em Destaque</h2>
        <div v-if="loadingFeatured" class="container-loading">Carregando...</div>
        <div v-else-if="featuredError" class="container-error">Erro: {{ featuredError }}</div>
        <div v-else>
          <InfoCarousel>
          <div class="carousel-item" v-for="char in featuredCharacters" :key="char.id">
            <CharacterCard :character="char" /> 
          </div>
          </InfoCarousel>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import CharacterCard from '../components/CharacterCard.vue'
import HeroBanner from '../components/HeroBanner.vue'
import InfoCarousel from '../components/InfoCarousel.vue'

const featuredCharacters = ref([])
const loadingFeatured = ref(false)
const featuredError = ref(null)

const aboutItems = [
  {
    title: 'Aventuras de ficção científica:',
    text: 'A premissa central é a de um cientista genial que inventa a arma de portais interdimensional e leva seu neto Morty para aventuras em outros planetas e realidades alternativas.',
    image: new URL('../assets/images/carousel/home/fiction.png', import.meta.url).href
  },
  {
    title: 'Reflexões filosóficas:',
    text: 'A série utiliza essas aventuras para explorar conceitos filosóficos, como o niilismo existencial (a ideia de que a vida não tem propósito inerente) e a indiferença do universo. A existência de infinitos universos (o multiverso) reforça a ideia de que nada é especial.',
    image: new URL('../assets/images/carousel/home/universe.jpeg', import.meta.url).href
  },
  {
    title: 'Comentário social:',
    text: '"Rick and Morty" também faz críticas sociais, como em episódios que abordam desigualdade (na "Cidadela dos Ricks e Mortys"), consumismo e a natureza da ética e da moralidade.',
    image: new URL('../assets/images/carousel/home/inequality.jpg', import.meta.url).href
  },
  {
    title: 'Paródia e humor:',
    text: 'A série também serve como uma paródia da cultura pop e da ficção científica, satirizando obras conhecidas com seu humor escatológico e muitas vezes ofensivo.',
    image: new URL('../assets/images/carousel/home/funny.jpg', import.meta.url).href
  },
  {
    title: 'Música e cultura pop:',
    text: 'As músicas da série, como "Get Schwifty", também encapsulam o espírito anárquico e inovador, promovendo uma mensagem de rejeição às normas convencionais.',
    image: new URL('../assets/images/carousel/home/get-schwifty.jpg', import.meta.url).href
  }
]

async function loadFeatured () {
  loadingFeatured.value = true
  featuredError.value = null
  try {
    const res = await api.get('/character', { params: { page: 1 } })
    const results = res.data.results || []
  featuredCharacters.value = results.slice(0, 5)
  } catch (err) {
    if (err.response && err.response.data && err.response.data.error) {
      featuredError.value = err.response.data.error
    } else {
      featuredError.value = err.message || 'Erro ao carregar personagens em destaque'
    }
  } finally {
    loadingFeatured.value = false
  }
}

onMounted(() => {
  loadFeatured()
})
</script>

<style scoped>
.container {
  margin: 0 auto;
  padding-left: var(--padding-default, 1rem);
  padding-right: var(--padding-default, 1rem);
  box-sizing: border-box;
}

.liquid-glass-container {
  box-sizing: border-box;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  height: 100%;
  border-radius: 0.5rem;
  background: linear-gradient(1000deg, rgba(255,255,255,0.02), black);
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  padding: 2em;
  margin-bottom: 2%;
}

@media (max-width: 992px) {
  .container {
    box-sizing: border-box;
    max-width: 100%;
    padding-left: var(--padding-default, 0.75rem);
    padding-right: var(--padding-default, 0.75rem);
  }

  .liquid-glass-container {
    padding: 1.5em;
    margin-bottom: 3%;
    max-width: 100%;
  }

  .carousel-item {
    width: 100%;
    min-width: 100%;
  }
}

@media (max-width: 640px) {
  .container {
    box-sizing: border-box;
    max-width: 100%;
    padding-left: var(--padding-default, 1rem);
    padding-right: var(--padding-default, 1rem);
  }

  .liquid-glass-container {
    padding: 1.5rem;
    border-radius: 0.4rem;
    margin-bottom: 4%;
  }

  .first-content, .second-content {
    text-align: inherit;
  }

  .cards-grid {
    flex-direction: column;
    align-items: center;
  }

  .carousel-item {
    width: 100%;
    min-width: 100%;
  }
}

.btn-load {
  margin: 0%;
  margin-bottom: 1.5rem;
}

.ordered-list {
  color: var(--text-muted);
}

.cards-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 12px;
}

.carousel-item {
  width: 90%;
  min-width: 40%;
  scroll-snap-align: start;
}


.second-content ::v-deep .carousel-item {
  box-sizing: border-box;
  width: 100%;
  min-width: 90%;
}

@media (min-width: 640px) {
  .second-content ::v-deep .carousel-item {
    min-width: 48.4%;
    width: auto;
  }
}

@media (min-width: 992px) {
  .second-content ::v-deep .carousel-item {
    min-width: 49.3%;
    width: auto;
  }
}

@media (max-width: 640px) {
  .second-content ::v-deep .carousel-item {
    min-width: 100% !important;
    width: 100% !important;
  }
}
</style>