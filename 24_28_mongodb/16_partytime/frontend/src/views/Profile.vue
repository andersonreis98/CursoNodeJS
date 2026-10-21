<template>
  <!-- bloco com a classe "profile" (usada para estilizar no CSS) -->
  <div class="profile">
    <!-- título principal -->
    <h1>Edite seu perfil</h1>
    <!-- componente do formulário de usuário (reaproveitado no cadastro e no perfil); o ":" (v-bind) faz o atributo user receber o valor de uma expressão JavaScript -->
    <UserForm page="profile" :user="user" btnText="Editar" :key="componentKey" />
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
    },
    // data: estado local do componente (variáveis usadas no template)
    data() {
        // retorna o objeto com os dados iniciais
        return {
            // usuário do banco
            user: {},
            // chave usada para forçar o componente filho a renderizar de novo (ao mudar o :key)
            componentKey: 0
        }
    },
    // created: executado quando o componente é criado (bom momento para buscar dados)
    created() {
        // carrega o usuário
        this.getUser();
    },
    // methods: funções do componente
    methods: {
    // método assíncrono getUser (usa await para esperar a API)
    async getUser() {

        // pega o id e o token do estado (store)
        const id = this.$store.getters.userId;
        // pega o token salvo na store
        const token = this.$store.getters.token;

        // requisição HTTP com fetch (espera a resposta)
        await fetch(`http://localhost:3000/api/user/${id}`, {
            // método HTTP GET
            method: "GET",
            // cabeçalhos da requisição
            headers: { 
                // avisa que o corpo é JSON
                "Content-type": "application/json",
                // envia o token no cabeçalho auth-token (lido pelo check-token do backend)
                "auth-token": token 
            }
        })
        // converte a resposta em JSON
        .then((resp) => resp.json())
        // data é o JSON devolvido pela API
        .then((data) => {

            // mostra no terminal/console do navegador (depuração)
            console.log(data.user);

            // atualiza user no estado do componente
            this.user = data.user;

            // muda a chave para recriar o formulário com os dados novos
            this.componentKey += 1;

        })
        // trata o erro caso a Promise falhe
        .catch((err) => {
            // mostra o erro no terminal
            console.log(err);
        })

    }
  }
}
</script>

<style scoped>
    .profile { /* estilos dos elementos com a classe "profile" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .profile h1 { /* estilos de "h1" que está dentro de ".profile" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }
</style>