<template>
  <!-- bloco com o id "nav" -->
  <div id="nav">
    <!-- link do Vue Router; link do Vue Router para / (troca de página sem recarregar) -->
    <router-link to="/" id="logo-container">
      <!-- imagem -->
      <img src="/img/partytimelogo.png" alt="Party Time">
    </router-link>    
    <!-- subtítulo com o nome do site -->
    <h2 id="nav-title">Party Time</h2>
    <!-- bloco com o id "nav-links" -->
    <div id="nav-links">
      <!-- link do Vue Router; link do Vue Router para / (troca de página sem recarregar) -->
      <router-link to="/">Festas</router-link>
      <!-- link do Vue Router; v-show: esconde com CSS quando "!authenticated" for falso -->
      <router-link to="/login" v-show="!authenticated">Entrar</router-link>
      <!-- link do Vue Router; v-show: esconde com CSS quando "!authenticated" for falso -->
      <router-link to="/register" v-show="!authenticated">Cadastrar</router-link>
      <!-- link do Vue Router; v-show: esconde com CSS quando "authenticated" for falso -->
      <router-link to="/dashboard" v-show="authenticated">Dashboard</router-link>
      <!-- link do Vue Router; v-show: esconde com CSS quando "authenticated" for falso -->
      <router-link to="/profile" v-show="authenticated">Configurações</router-link>
      <!-- botão; v-show: esconde com CSS quando "authenticated" for falso -->
      <button @click="logout($event)" v-show="authenticated">Logout</button>
    </div>
  </div>
</template>


<script>
// mapState cria propriedades computadas a partir do estado da store
import { mapState } from 'vuex';

// objeto de configuração do componente (Options API do Vue)
export default {  
  // nome do componente
  name: "Navbar",
  // data: estado local do componente (variáveis usadas no template)
  data () {
    // retorna o objeto com os dados iniciais
    return {

    }
  },
  // methods: funções do componente
  methods: {
    // método logout; "e" é o evento do navegador
    logout(e) {
      // impede o comportamento padrão do evento (ex.: recarregar a página ao enviar o form)
      e.preventDefault();

      // Dispara a mutation que faz o logout do usuário
      this.$store.commit("logout");
      // redireciona
      this.$router.push("/");
    }
  },
  // computed: propriedades calculadas a partir de outros dados
  computed: {
    // traz estes itens da store como propriedades computadas
    ...mapState([
        // estado "authenticated" da store
        'authenticated',
    ])
}
}

</script>
<style scoped>
  #nav { /* estilos do elemento com id "nav" */
    display: flex; /* tipo de exibição (flex, block, inline, grid...) */
    align-items: center; /* alinhamento dos itens no eixo cruzado do flex */
    justify-content: space-between; /* alinhamento dos itens no eixo principal do flex */
    padding: 20px; /* espaço interno (entre o conteúdo e a borda) */
    border-bottom: 1px solid #eee; /* borda inferior */
  }

  #nav a { /* estilos de "a" que está dentro de "#nav" */
    text-decoration: none; /* decoração do texto (none remove o sublinhado dos links) */
    margin-right: 15px; /* espaço externo à direita */
  }

  #nav img { /* estilos de "img" que está dentro de "#nav" */
    width: 35px; /* largura */
  }

  #nav-title { /* estilos do elemento com id "nav-title" */
    font-size: 3rem; /* tamanho da fonte */
    font-weight: 300; /* espessura da fonte (bold = negrito) */
  }

  #logo-container, #nav-links { /* aplica as mesmas regras a vários seletores */
    width: 400px; /* largura */
  }

  #nav-links { /* estilos do elemento com id "nav-links" */
    display: flex; /* tipo de exibição (flex, block, inline, grid...) */
    justify-content: flex-end; /* alinhamento dos itens no eixo principal do flex */
  }

  button { /* estilos de todas as tags <button> */
    background-color: #FFF; /* cor de fundo */
    border: none; /* borda (espessura, estilo e cor) */
    font-size: 16px; /* tamanho da fonte */
    cursor: pointer; /* formato do cursor do mouse */
  }

  button:hover { /* estilo quando o mouse passa por cima */
    color: #c1b696; /* cor do texto */
  }
</style>