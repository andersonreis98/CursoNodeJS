<template>
  <!-- parágrafo de texto; o que está entre {{ }} é substituído pelo valor enviado pelo servidor; v-if: só renderiza se "msg" for verdadeiro -->
  <p class="msg" :class="msgClass" v-if="msg">{{ msg }}</p>
</template>

<script>
// objeto de configuração do componente (Options API do Vue)
export default {
  // nome do componente
  name: "Message",
  // props: dados recebidos do componente pai
  props: ["msg", "msgClass"]
}
</script>

<style scoped>

  .msg { /* estilos dos elementos com a classe "msg" */
    max-width: 500px; /* largura máxima */
    margin: 20px auto; /* espaço externo (fora da borda) */
    padding: 20px; /* espaço interno (entre o conteúdo e a borda) */
    text-align: center; /* alinhamento horizontal do texto */
    border: 1px solid #CCC; /* borda (espessura, estilo e cor) */
    border-radius: 5px; /* arredonda os cantos */
  }

  .error { /* estilos dos elementos com a classe "error" */
    color: #721c24; /* cor do texto */
    background-color: #f8d7da; /* cor de fundo */
    border-color: #f5c6cb; /* cor da borda */
  }

  .success { /* estilos dos elementos com a classe "success" */
    color: #155724; /* cor do texto */
    background-color: #d4edda; /* cor de fundo */
    border-color: #c3e6cb; /* cor da borda */
  }

</style>