<template>
  <!-- bloco com a classe "party" (usada para estilizar no CSS) -->
  <div class="party">
    <!-- título principal; o que está entre {{ }} é substituído pelo valor enviado pelo servidor -->
    <h1>{{ party.title }}</h1>
    <!-- bloco com a classe "party-container" (usada para estilizar no CSS) -->
    <div class="party-container">
      <!-- bloco com a classe "party-images" (usada para estilizar no CSS); v-if: só renderiza se "party.photos" for verdadeiro -->
      <div class="party-images" v-if="party.photos">
        <!-- bloco com a classe "main-image" (usada para estilizar no CSS); o ":" (v-bind) faz o atributo style receber o valor de uma expressão JavaScript -->
        <div class="main-image" :style="{'background-image': 'url(' + party.photos[0] +')'}"></div>
        <!-- bloco com a classe "party-mini-images" (usada para estilizar no CSS); v-if: só renderiza se "party.photos[1]" for verdadeiro -->
        <div class="party-mini-images" v-if="party.photos[1]">
          <!-- bloco com a classe "mini-image" (usada para estilizar no CSS); v-for repete este elemento para cada item de party.photos -->
          <div class="mini-image" v-for="(photo, index) in party.photos" :key="index" :style="{'background-image': 'url(' + party.photos[index] +')'}"></div>
        </div>
      </div>
      <!-- bloco com a classe "party-details" (usada para estilizar no CSS) -->
      <div class="party-details">
        <!-- parágrafo de texto -->
        <p class="bold">Descrição da festa:</p>
        <!-- parágrafo de texto; o que está entre {{ }} é substituído pelo valor enviado pelo servidor -->
        <p class="party-description">{{ party.description }}</p>
        <!-- parágrafo de texto -->
        <p class="bold">Data da festa:</p>
        <!-- parágrafo de texto; o que está entre {{ }} é substituído pelo valor enviado pelo servidor -->
        <p class="party-date">{{ party.partyDate }}</p>        
      </div>
    </div>
  </div>
</template>

<script>
// objeto de configuração do componente (Options API do Vue)
export default {
    // components: componentes filhos usados no template
    components: {
    },
    // data: estado local do componente (variáveis usadas no template)
    data() {
        // retorna o objeto com os dados iniciais
        return {
          // party começa como objeto vazio
          party: {},
        }
    },
    // created: executado quando o componente é criado (bom momento para buscar dados)
    created() {
        // carrega a festa
        this.getParty();
    },
    // methods: funções do componente
    methods: {
        // método assíncrono getParty (usa await para esperar a API)
        async getParty() {

            // pega o id da URL e o token do estado (store)
            const id = this.$route.params.id;
            // pega o token salvo na store
            const token = this.$store.getters.token;

            // requisição HTTP com fetch (espera a resposta)
            await fetch(`http://localhost:3000/api/party/${id}`, {
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

                // atualiza party no estado do componente
                this.party = data.party;

                // formata a data no padrão do navegador (ex.: 25/12/2021)
                this.party.partyDate = new Date(this.party.partyDate).toLocaleDateString();

                // percorre as fotos da festa
                this.party.photos.forEach((photo, index) => {
                  // troca "public" pelo endereço da API e as barras invertidas (Windows) por "/" para montar a URL da imagem
                  this.party.photos[index] = photo.replace("public", "http://localhost:3000").replaceAll("\\", "/");
                });

                // mostra no terminal/console do navegador (depuração)
                console.log(this.party);
                // mostra no terminal/console do navegador (depuração)
                console.log(this.party.photos);

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
    .party { /* estilos dos elementos com a classe "party" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
        width: 1000px; /* largura */
        margin: 0 auto; /* espaço externo (fora da borda) */
    }

    .party h1 { /* estilos de "h1" que está dentro de ".party" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }

    .party-container { /* estilos dos elementos com a classe "party-container" */
      display: flex; /* tipo de exibição (flex, block, inline, grid...) */
    }

    .party-images { /* estilos dos elementos com a classe "party-images" */
      width: 380px; /* largura */
      margin-right: 30px; /* espaço externo à direita */
    }

    .main-image { /* estilos dos elementos com a classe "main-image" */
      width: 100%; /* largura */
      height: 200px; /* altura */
      background-color: #CCC; /* cor de fundo */
      margin-bottom: 15px; /* espaço externo embaixo */
      background-position: center; /* posição da imagem de fundo */
      background-size: cover; /* tamanho da imagem de fundo */
    }

    .party-mini-images { /* estilos dos elementos com a classe "party-mini-images" */
      display: flex; /* tipo de exibição (flex, block, inline, grid...) */
      flex-wrap: wrap; /* permite os itens quebrarem para a linha seguinte */
    }

    .mini-image { /* estilos dos elementos com a classe "mini-image" */
      width: 80px; /* largura */
      height: 80px; /* altura */
      margin-right: 15px; /* espaço externo à direita */
      background-color: #CCC; /* cor de fundo */
      margin-bottom: 15px; /* espaço externo embaixo */
      background-position: center; /* posição da imagem de fundo */
      background-size: cover; /* tamanho da imagem de fundo */
    }

    .party-details { /* estilos dos elementos com a classe "party-details" */
      display: flex; /* tipo de exibição (flex, block, inline, grid...) */
      flex-direction: column; /* direção dos itens no flex (linha ou coluna) */
      align-items: flex-start; /* alinhamento dos itens no eixo cruzado do flex */
    }

    .bold { /* estilos dos elementos com a classe "bold" */
      font-weight: bold; /* espessura da fonte (bold = negrito) */
      margin-bottom: 12px; /* espaço externo embaixo */
    }

    .party-description, .party-date { /* aplica as mesmas regras a vários seletores */
      margin-bottom: 20px; /* espaço externo embaixo */
    }
</style>