<template>
  <!-- bloco com a classe "dashboard" (usada para estilizar no CSS) -->
  <div class="dashboard">
    <!-- bloco com a classe "title-container" (usada para estilizar no CSS) -->
    <div class="title-container">
        <!-- título principal -->
        <h1>Gerencie seus eventos</h1>
        <!-- link do Vue Router; link do Vue Router para /newparty (troca de página sem recarregar) -->
        <router-link to="/newparty" class="btn">Cadastrar Festa</router-link>
    </div>
    <!-- bloco que agrupa elementos; v-if: só renderiza se "parties.length > 0" for verdadeiro -->
    <div v-if="parties.length > 0">
        <!-- componente da tabela de festas; recebe a lista por prop; o ":" (v-bind) faz o atributo parties receber o valor de uma expressão JavaScript -->
        <DataTable :parties="parties" />
    </div>
    <!-- bloco que agrupa elementos; v-else: renderiza quando o v-if anterior for falso -->
    <div v-else>
        <!-- parágrafo de texto; link do Vue Router para /newparty (troca de página sem recarregar) -->
        <p>Você ainda não tem festas cadastradas, <router-link to="/newparty">clique aqui para criar a sua festa!</router-link></p>
    </div>
  </div>
</template>

<script>
// importa o componente DataTable
import DataTable from '../components/DataTable'

// objeto de configuração do componente (Options API do Vue)
export default {
    // components: componentes filhos usados no template
    components: {
        // registra o componente DataTable para usar como <DataTable /> no template
        DataTable
    },
    // data: estado local do componente (variáveis usadas no template)
    data() {
        // retorna o objeto com os dados iniciais
        return {
            // lista de festas (começa vazia)
            parties: []
        }
    },
    // methods: funções do componente
    methods: {
        // método assíncrono getParties (usa await para esperar a API)
        async getParties() {

            // pega o token do estado (store)
            const token = this.$store.getters.token;

            // requisição HTTP com fetch (espera a resposta)
            await fetch("http://localhost:3000/api/party/userparties", {
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

                // atualiza parties no estado do componente
                this.parties = data.parties;

            })
            // trata o erro caso a Promise falhe
            .catch((err) => {
                // mostra o erro no terminal
                console.log(err);
            })
        
        }
    },
    // created: executado quando o componente é criado (bom momento para buscar dados)
    created() {
        // carrega as festas do usuário
        this.getParties();
    },
}
</script>

<style scoped>
    .dashboard { /* estilos dos elementos com a classe "dashboard" */
        padding: 50px; /* espaço interno (entre o conteúdo e a borda) */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .title-container { /* estilos dos elementos com a classe "title-container" */
        display: flex;         /* tipo de exibição (flex, block, inline, grid...) */
        align-items: center; /* alinhamento dos itens no eixo cruzado do flex */
        justify-content: space-between; /* alinhamento dos itens no eixo principal do flex */
        margin-bottom: 40px; /* espaço externo embaixo */
    }
    
    .btn { /* estilos dos elementos com a classe "btn" */
        padding: 10px 16px; /* espaço interno (entre o conteúdo e a borda) */
        background-color: #000; /* cor de fundo */
        color: #FFF; /* cor do texto */
        margin: 5px; /* espaço externo (fora da borda) */
        text-decoration: none; /* decoração do texto (none remove o sublinhado dos links) */
        border: none; /* borda (espessura, estilo e cor) */
        font-size: 14px; /* tamanho da fonte */
        cursor: pointer; /* formato do cursor do mouse */
        transition: .5s; /* animação suave ao mudar propriedades */
    }
    
</style>