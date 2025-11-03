<script setup>
import AppHeader from './components/AppHeader.vue';


</script>

<template>
  <AppHeader />
  <router-view />
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
/* 
Paleta Principal (Portal e Personagens)
Esta paleta captura os elementos mais icônicos da série e funciona bem como base para um design de site vibrante.
Verde do Portal: #97ce4c ou um ciano mais claro como #0bb4e4 (para o fluido do portal)
Pele do Rick: #a3cfe7 (um azul claro)
Camisa do Morty: #f0e14a (amarelo)
Pele do Morty: #e4a788 (um tom de pêssego/marrom claro)
Fundo Neutro: #44281d (marrom escuro, quase preto, para contraste)
Detalhes/Destaque: #e89ac7 (um rosa ou magenta para um toque de cor adicional)

Paleta de Cores do Título/Logotipo
Se quiser focar na paleta da tela de título, estas são as cores:
Amarelo Principal (Yellow Tan): #f0e14a
Vermelho Intenso (Heavy Red): #9b2948 (do logo ou sangue)
Cinzento Escuro (Floppy Disk/Battletoad): #303032 ou similar para textos/fundos escuros

Dicas para o Design do Site:
Contraste: Use o verde-limão e o amarelo como cores de destaque para botões e links, em contraste com fundos escuros (como o marrom escuro ou preto) para garantir boa legibilidade.
Atmosfera: O uso de fundos escuros ajuda a criar a atmosfera espacial e sombria da série, enquanto as cores claras dos personagens e do portal trazem a energia e o humor.
Psicadélico: Adicione um toque de aleatoriedade ou elementos gráficos que lembrem o multiverso para complementar as cores.
*/
</style>
