<template>
  <!-- rodapé da página -->
  <footer>
    <!-- título de terceiro nível -->
    <h3>Party Time &copy; 2021</h3>
    <!-- parágrafo de texto -->
    <p>O melhor local para compartilhar seus eventos!</p>
  </footer>
</template>

<script>
// objeto de configuração do componente (Options API do Vue)
export default {
  // nome do componente
  name: "Footer"
}
</script>

<style scoped>
  footer { /* estilos de todas as tags <footer> */
    background-color: #25282e; /* cor de fundo */
    height: 300px; /* altura */
    display: flex; /* tipo de exibição (flex, block, inline, grid...) */
    justify-content: center; /* alinhamento dos itens no eixo principal do flex */
    align-items: center; /* alinhamento dos itens no eixo cruzado do flex */
    flex-direction: column; /* direção dos itens no flex (linha ou coluna) */
  }

  footer h3 { /* estilos de "h3" que está dentro de "footer" */
    color: #FFF; /* cor do texto */
    margin-bottom: 15px; /* espaço externo embaixo */
    font-weight: 300; /* espessura da fonte (bold = negrito) */
    font-size: 1.6rem; /* tamanho da fonte */
  }

  footer p { /* estilos de "p" que está dentro de "footer" */
    color: #c1b696; /* cor do texto */
  }

</style>