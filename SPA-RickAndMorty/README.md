# SPA Rick and Morty (Vue 3 + Vite)

Este repositório é uma Single Page Application usando Vue 3 + Vite.

Instruções rápidas

Pré-requisitos
- Node.js 16+ (recomendado)
- npm (ou outro gerenciador compatível)

Instalação

1. Clone o repositório (SSH):

```bash
git clone git@github.com:Gabriel-Rodrigo-Andrade/SPA-RickAndMorty.git
cd SPA-RickAndMorty
```

2. Instale as dependências:

```bash
npm install
```

Desenvolvimento

```bash
npm run dev
# abra http://localhost:5173
```

Build para produção

```bash
npm run build
npm run preview  # para servir o build localmente
```

Notas sobre Tailwind CSS
- Este projeto usa Tailwind CSS (v4). A partir da v4 o plugin PostCSS foi movido para `@tailwindcss/postcss`.
- Se você encontrar um erro relacionado ao PostCSS como "The PostCSS plugin has moved...", rode `npm install` para garantir que `@tailwindcss/postcss` esteja instalado (já está presente no projeto).
- Se o seu editor marcar `@tailwind` como regra desconhecida, isso é apenas lint/IDE — o Vite/PostCSS processará as diretivas quando o servidor rodar ou quando fizer o build.

Problemas comuns
- Se o servidor não iniciar, verifique a versão do Node (`node -v`) e rode `npm install` novamente.
- Para dúvidas, cole o erro aqui que eu ajudo a diagnosticar.
