<template>
  <!-- bloco com a classe "login" (usada para estilizar no CSS) -->
  <div class="login">
    <!-- título principal -->
    <h1>Entrar no Party Time</h1>
    <!-- componente do formulário de login -->
    <LoginForm />
  </div>
</template>

<script>
// importa o componente LoginForm
import LoginForm from '../components/LoginForm'

// objeto de configuração do componente (Options API do Vue)
export default {
    // components: componentes filhos usados no template
    components: {
        // registra o componente LoginForm para usar como <LoginForm /> no template
        LoginForm
    }
}
</script>

<style scoped>
    .login { /* estilos dos elementos com a classe "login" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .login h1 { /* estilos de "h1" que está dentro de ".login" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }
</style>