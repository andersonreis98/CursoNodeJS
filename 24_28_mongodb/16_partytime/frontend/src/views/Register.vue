<template>
  <!-- bloco com a classe "register" (usada para estilizar no CSS) -->
  <div class="register">
    <!-- título principal -->
    <h1>Criar uma conta</h1>
    <!-- componente do formulário de usuário (reaproveitado no cadastro e no perfil); o ":" (v-bind) faz o atributo user receber o valor de uma expressão JavaScript -->
    <UserForm :user="{}" page="register" btnText="Cadastrar" />
  </div>
</template>

<script>
// importa o componente UserForm
import UserForm from '../components/UserForm'

// objeto de configuração do componente (Options API do Vue)
export default {
    // components: componentes filhos usados no template
    components: {
        // registra o componente UserForm para usar como <UserForm /> no template
        UserForm
    }
}
</script>

<style scoped>
    .register { /* estilos dos elementos com a classe "register" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .register h1 { /* estilos de "h1" que está dentro de ".register" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }
</style>