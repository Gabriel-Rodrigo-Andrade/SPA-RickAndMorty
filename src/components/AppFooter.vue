<template>
  <footer class="site-footer">
    <div class="container-footer">
      <div class="footer-info">
        <p>
          copy; 2025 Desenvolvido por <span>Gabriel Andrade</span>. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>

</script>

<style scoped>
.site-footer {
  background: rgba(0, 0, 0, 0.6);
  border-top: 1px solid #444444;
  padding: 0 20px;
  text-align: center;
}

.container-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.footer-info {
  color: #aaa;
  font-size: 0.2rem;
}

.footer-info span {
  color: #fff;
  font-weight: 400;
}

@media (max-width: 640px) {
  .footer-info {
    font-size: 0.75rem;
    line-height: 1.2;
    padding: 0 10px;
  }
}
</style>