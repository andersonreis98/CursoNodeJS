<template>
    <!-- botão que envia o formulário; o ":" (v-bind) faz o atributo value receber o valor de uma expressão JavaScript -->
    <input type="submit" :value="text">
</template>

<script>
// objeto de configuração do componente (Options API do Vue)
export default {
    // nome do componente
    name: "InputSubmit",
    // configuração da coluna props
    props: {
        // prop text (texto do botão), com valor padrão vazio
        text: ""
    }
}
</script>

<style scoped>
    input[type='submit'] { /* estilos de todas as tags <input[type='submit']> */
        width: 200px; /* largura */
        margin: 0 auto; /* espaço externo (fora da borda) */
        text-transform: uppercase; /* transforma maiúsculas/minúsculas */
        color: #fff; /* cor do texto */
        background-color: #25282e; /* cor de fundo */
        transition: .5s; /* animação suave ao mudar propriedades */
        border: 0; /* borda (espessura, estilo e cor) */
        padding: 12px; /* espaço interno (entre o conteúdo e a borda) */
        cursor: pointer; /* formato do cursor do mouse */
    }

    input[type='submit']:hover { /* estilo quando o mouse passa por cima */
        background-color: #141619; /* cor de fundo */
    }
</style>