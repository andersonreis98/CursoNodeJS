<template>
  <!-- bloco com a classe "newparty" (usada para estilizar no CSS) -->
  <div class="newparty">
    <!-- título principal -->
    <h1>Adicione a sua festa:</h1>
    <!-- componente do formulário de festa (reaproveitado na criação e na edição); o ":" (v-bind) faz o atributo party receber o valor de uma expressão JavaScript -->
    <PartyForm :party="{}" page="newparty" btnText="Criar Festa!" />
  </div>
</template>

<script>
// importa o componente PartyForm
import PartyForm from '../components/PartyForm.vue'

// objeto de configuração do componente (Options API do Vue)
export default {
    // components: componentes filhos usados no template
    components: {
        // registra o componente PartyForm para usar como <PartyForm /> no template
        PartyForm
    }
}
</script>

<style scoped>
    .newparty { /* estilos dos elementos com a classe "newparty" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .newparty h1 { /* estilos de "h1" que está dentro de ".newparty" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }
</style>