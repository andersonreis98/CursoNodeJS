<template>
  <!-- bloco com a classe "data-container" (usada para estilizar no CSS) -->
  <div class="data-container">
      <!-- componente de mensagem; recebe o texto e a classe por props; o ":" (v-bind) faz o atributo msg receber o valor de uma expressão JavaScript -->
      <Message :msg="msg" :msgClass="msgClass" />
      <!-- bloco com a classe "data-table-heading" (usada para estilizar no CSS) -->
      <div class="data-table-heading">
          <!-- bloco com a classe "data-id-heading" (usada para estilizar no CSS) -->
          <div class="data-id-heading">Nº:</div>
          <!-- bloco com a classe "data-title-heading" (usada para estilizar no CSS) -->
          <div class="data-title-heading">Nome da Festa:</div>
          <!-- bloco com a classe "data-actions-heading" (usada para estilizar no CSS) -->
          <div class="data-actions-heading">Ações:</div>
      </div>
      <!-- bloco com a classe "data-table-body" (usada para estilizar no CSS) -->
      <div class="data-table-body">
        
        <!-- bloco com a classe "data-row" (usada para estilizar no CSS); v-for repete este elemento para cada item de parties -->
        <div class="data-row" v-for="(party, index) in parties" :key="party._id">
            <!-- bloco com a classe "data-id-container" (usada para estilizar no CSS); o que está entre {{ }} é substituído pelo valor enviado pelo servidor -->
            <div class="data-id-container">{{ index + 1 }}</div>
            <!-- bloco com a classe "data-title-container" (usada para estilizar no CSS) -->
            <div class="data-title-container">
                <!-- link do Vue Router; o que está entre {{ }} é substituído pelo valor enviado pelo servidor; link do Vue Router com destino dinâmico -->
                <router-link :to="`/party/${party._id}`">{{ party.title }}</router-link>
            </div>
            <!-- bloco com a classe "data-actions-container" (usada para estilizar no CSS) -->
            <div class="data-actions-container">
                <!-- link do Vue Router; link do Vue Router com destino dinâmico -->
                <router-link :to="`/editparty/${party._id}`" class="edit-btn">Editar</router-link>
                <!-- botão; ao clicar, chama o método remove -->
                <button class="remove-btn" @click="remove(party._id)">Remover</button>
            </div>
        </div>

      </div>
  </div>
</template>

<script>
// importa o componente Message
import Message from './Message';

// objeto de configuração do componente (Options API do Vue)
export default {
  // nome do componente
  name: "Footer",
  // props: dados recebidos do componente pai
  props: ["parties"],
  // components: componentes filhos usados no template
  components: {
    // registra o componente Message para usar como <Message /> no template
    Message
  },
  // data: estado local do componente (variáveis usadas no template)
  data() {
      // retorna o objeto com os dados iniciais
      return {
        // texto/classe da mensagem (null = nenhuma mensagem)
        msg: null,
        // texto/classe da mensagem (null = nenhuma mensagem)
        msgClass: null,
      }
  },
  // methods: funções do componente
  methods: {
    // método assíncrono remove (usa await para esperar a API)
    async remove(id) {

        // pega o id e o token do estado (store)
        const userId = this.$store.getters.userId;
        // pega o token salvo na store
        const token = this.$store.getters.token;

        // monta o objeto data
        const data = {
            // compara a coluna id com o valor recebido
            id: id,
            // id do usuário (atalho seria só userId)
            userId: userId
        }

        // converte o objeto em texto JSON para enviar
        const jsonData = JSON.stringify(data);

        // requisição HTTP com fetch (espera a resposta)
        await fetch(`http://localhost:3000/api/party`, {
            // método HTTP DELETE
            method: "DELETE",
            // cabeçalhos da requisição
            headers: { 
                // avisa que o corpo é JSON
                "Content-type": "application/json",
                // envia o token no cabeçalho auth-token (lido pelo check-token do backend)
                "auth-token": token 
            },
            // corpo da requisição
            body: jsonData
        })
        // converte a resposta em JSON
        .then((resp) => resp.json())
        // data é o JSON devolvido pela API
        .then((data) => {

            // a API devolveu erro
            if(data.error) {
                // mensagem exibida na tela
                this.msg = data.error;
                // classe CSS da mensagem (error)
                this.msgClass = "error";
            // caso contrário
            } else {
                // mensagem exibida na tela
                this.msg = data.msg;
                // classe CSS da mensagem (success)
                this.msgClass = "success";
            }

            // executa depois de um tempo
            setTimeout(() => {

                // guarda null na propriedade msg do objeto
                this.msg = null;  
                
                // busca todas as festas de novo
                this.$parent.getParties();

                
            // fim do setTimeout: espera 1000 ms (1 s) antes de executar
            }, 1000);

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

    .data-table-heading, .data-row { /* aplica as mesmas regras a vários seletores */
        display: flex; /* tipo de exibição (flex, block, inline, grid...) */
        align-items: center; /* alinhamento dos itens no eixo cruzado do flex */
        height: 50px; /* altura */
        border-bottom: 1px solid #CCC; /* borda inferior */
    }

    .data-table-heading div, .data-row div { /* aplica as mesmas regras a vários seletores */
        flex: 1 1 0; /* quanto o item cresce/encolhe dentro do flex */
    } 

    .data-id-heading, .data-id-container { /* aplica as mesmas regras a vários seletores */
        max-width: 50px /* largura máxima */
    }

    .edit-btn, .remove-btn { /* aplica as mesmas regras a vários seletores */
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

    .edit-btn { /* estilos dos elementos com a classe "edit-btn" */
        background-color: #007bff; /* cor de fundo */
    }

    .edit-btn:hover { /* estilo quando o mouse passa por cima */
        background-color: #0069d9; /* cor de fundo */
    }

    .remove-btn { /* estilos dos elementos com a classe "remove-btn" */
        background-color: #dc3545; /* cor de fundo */
    }

    .remove-btn:hover { /* estilo quando o mouse passa por cima */
        background-color: #c82333; /* cor de fundo */
    }

</style>