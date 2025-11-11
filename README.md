# SPA Rick and Morty (Vue 3 + Vite)

Este repositório é uma Single Page Application (SPA) construída com Vue 3 e Vite que consome a API pública do Rick and Morty.

## Como rodar o projeto

Pré-requisitos
- Node.js 16+ (recomendado)
- npm ou yarn

Instalação e execução em desenvolvimento

```bash
# clonar o repositório
git clone git@github.com:Gabriel-Rodrigo-Andrade/SPA-RickAndMorty.git
cd SPA-RickAndMorty

# instalar dependências (npm)
npm install

# iniciar servidor de desenvolvimento (Vite)
npm run dev

# abra no navegador: http://localhost:5173
```

Build para produção

```bash
# gerar build
npm run build

# servir build localmente
npm run preview
```

Observações de ambiente
- Se usar `yarn` substitua `npm install` por `yarn` e os scripts `npm run ...` por `yarn ...`.

## Como o projeto funciona (visão geral técnica)

O projeto segue uma arquitetura típica de SPA com as seguintes responsabilidades e bibliotecas principais:

- Vue 3 + Vite: base do projeto e bundler/development server.
- Axios: usado para consumir a API do Rick and Morty. A instância axios está em `src/services/api.js` e já vem configurada com a baseURL `https://rickandmortyapi.com/api`.
- Pinia: gerenciador de estado (substitui Vuex). Há uma store `src/stores/favoritesStore.js` que mantém os IDs dos personagens favoritos e persiste esses dados no `localStorage`.
- Vue Router: organiza as rotas e páginas (arquivo em `router/index.js`).
- Tailwind CSS: estilos utilitários do projeto (configurado via `tailwind.config.cjs` e PostCSS).

Arquivos/folders importantes

- `src/main.js` — ponto de entrada da aplicação (cria app, registra Pinia e Router).
- `src/services/api.js` — instância axios usada por componentes e páginas.
- `src/stores/favoritesStore.js` — store Pinia que armazena e persiste favoritos no `localStorage`.
- `src/router/index.js` — definição de rotas (Home, Lista de Personagens, Detalhe, Favoritos).
- `src/pages/` — páginas da aplicação: `HomePage.vue`, `CharactersList.vue`, `CharacterDetail.vue`, `FavoritesPage.vue`.
- `src/components/` — componentes reutilizáveis (cards, header/footer, banner, carrossel, etc.).

Fluxo básico da aplicação

1. A página de lista de personagens (`CharactersList.vue`) consome a API usando a instância `api` (axios). Faz chamadas como `api.get('/character')` e trata paginação/filtragem.
2. Ao clicar em um personagem, a rota navega para `CharacterDetail.vue`, que consulta `api.get(`/character/${id}`)` para obter detalhes.
3. Favoritos: quando o usuário marca um personagem como favorito, o componente chama ações da Pinia (`useFavoritesStore`) — `addFavorite`, `removeFavorite`, `toggleFavorite` — e a store salva o array de IDs no `localStorage` (chave `ram_favorites_ids_v1`). Isso garante persistência entre sessões.
4. A página de Favoritos (`FavoritesPage.vue`) lê os IDs da store, busca os dados necessários (pode reutilizar endpoints da API) e exibe os cards favoritos.

Detalhes técnicos rápidos

- `src/services/api.js`:

```javascript
import axios from 'axios'

const api = axios.create({
	baseURL: 'https://rickandmortyapi.com/api',
	timeout: 10000,
})

export default api
```

- `src/stores/favoritesStore.js` (persistência local): a store lê os IDs inicialmente do `localStorage` e fornece métodos `addFavorite`, `removeFavorite`, `toggleFavorite` e um `save()` que grava o array em `localStorage`.

Problemas comuns e resolução

- Erro ao iniciar o dev server: verifique versão do Node (`node -v`) e rode `npm install` novamente.
- Erro relacionado ao PostCSS/Tailwind: Rode `npm install` e confirme que `postcss` e `@tailwindcss/postcss` estão nas dependências.

---