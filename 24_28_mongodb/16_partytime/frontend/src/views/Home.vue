<template>
  <!-- bloco com a classe "home" (usada para estilizar no CSS) -->
  <div class="home">
    <!-- título principal -->
    <h1>Veja as últimas festas</h1>
    <!-- bloco com a classe "parties-container" (usada para estilizar no CSS) -->
    <div class="parties-container">
        <!-- bloco que agrupa elementos; v-for repete este elemento para cada item de parties -->
        <div v-for="(party, index) in parties" :key="index" class="party-container">
            <!-- bloco com a classe "party-img" (usada para estilizar no CSS); o ":" (v-bind) faz o atributo style receber o valor de uma expressão JavaScript -->
            <div class="party-img" :style="{'background-image': 'url(' + party.photos[0] +')'}"></div>
            <!-- link do Vue Router; o que está entre {{ }} é substituído pelo valor enviado pelo servidor; link do Vue Router com destino dinâmico -->
            <router-link :to="`/party/${party._id}`" class="party-title">{{ party.title }}</router-link>
            <!-- parágrafo de texto; o que está entre {{ }} é substituído pelo valor enviado pelo servidor -->
            <p class="party-date">Data: {{ party.partyDate }}</p>
            <!-- link do Vue Router; link do Vue Router com destino dinâmico -->
            <router-link :to="`/party/${party._id}`" class="party-details-btn">Ver Mais</router-link>
        </div>        
    </div>
    <!-- parágrafo de texto; v-if: só renderiza se "parties.length == 0" for verdadeiro -->
    <p v-if="parties.length == 0">Não há festas ainda...</p>
  </div>
</template>
<script>

// objeto de configuração do componente (Options API do Vue)
export default {
    // data: estado local do componente (variáveis usadas no template)
    data() {
        // retorna o objeto com os dados iniciais
        return {
            // lista de festas (começa vazia)
            parties: []
        }
    },
    // created: executado quando o componente é criado (bom momento para buscar dados)
    created() {
        // carrega as festas públicas
        this.getParties();
    },
    // methods: funções do componente
    methods: {
        // método assíncrono getParties (usa await para esperar a API)
        async getParties() {

            // requisição HTTP com fetch (espera a resposta)
            await fetch(`http://localhost:3000/api/party/all`, {
                // método HTTP GET
                method: "GET",
                // cabeçalhos da requisição
                headers: { 
                    // avisa que o corpo é JSON
                    "Content-type": "application/json"
                }
            })
            // converte a resposta em JSON
            .then((resp) => resp.json())
            // data é o JSON devolvido pela API
            .then((data) => {

                // ajusta cada festa recebida
                data.parties.forEach((party, index) => {

                    // só formata se a festa tiver data
                    if(party.partyDate) {
                        // formata a data no padrão do navegador (ex.: 25/12/2021)
                        party.partyDate = new Date(party.partyDate).toLocaleDateString();
                    }

                    // percorre as fotos da festa
                    party.photos.forEach((photo, index) => {
                        // troca "public" pelo endereço da API e as barras invertidas (Windows) por "/" para montar a URL da imagem
                        party.photos[index] = photo.replace("public", "http://localhost:3000").replaceAll("\\", "/");
                    });

                });

                // atualiza parties no estado do componente
                this.parties = data.parties;

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

    .home { /* estilos dos elementos com a classe "home" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .home h1 { /* estilos de "h1" que está dentro de ".home" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }

    .parties-container { /* estilos dos elementos com a classe "parties-container" */
        display: flex; /* tipo de exibição (flex, block, inline, grid...) */
        flex-wrap: wrap; /* permite os itens quebrarem para a linha seguinte */
        max-width: 1000px; /* largura máxima */
        margin: 0 auto; /* espaço externo (fora da borda) */
    }

    .party-container { /* estilos dos elementos com a classe "party-container" */
        width: 30.3%; /* largura */
        margin: 1.5%; /* espaço externo (fora da borda) */
        display: flex; /* tipo de exibição (flex, block, inline, grid...) */
        flex-direction: column; /* direção dos itens no flex (linha ou coluna) */
    }

    .party-img { /* estilos dos elementos com a classe "party-img" */
        width: 100%; /* largura */
        height: 200px; /* altura */
        margin-bottom: 12px; /* espaço externo embaixo */
        background-position: center; /* posição da imagem de fundo */
        background-size: cover; /* tamanho da imagem de fundo */
    }

    .party-title { /* estilos dos elementos com a classe "party-title" */
        color: #25282e; /* cor do texto */
        text-decoration: none; /* decoração do texto (none remove o sublinhado dos links) */
        margin-bottom: 12px; /* espaço externo embaixo */
    }

    .party-date { /* estilos dos elementos com a classe "party-date" */
        color: #777; /* cor do texto */
        margin-bottom: 12px; /* espaço externo embaixo */
    }

    .party-details-btn { /* estilos dos elementos com a classe "party-details-btn" */
        width: 100%; /* largura */
        text-transform: uppercase; /* transforma maiúsculas/minúsculas */
        color: #fff; /* cor do texto */
        background-color: #25282e; /* cor de fundo */
        transition: .5s; /* animação suave ao mudar propriedades */
        border: 0; /* borda (espessura, estilo e cor) */
        padding: 12px; /* espaço interno (entre o conteúdo e a borda) */
        text-decoration: none; /* decoração do texto (none remove o sublinhado dos links) */
        text-align: center; /* alinhamento horizontal do texto */
    }

    .party-details-btn:hover { /* estilo quando o mouse passa por cima */
        background-color: #141619; /* cor de fundo */
    }
    
    #party-1 { /* estilos do elemento com id "party-1" */
        background-image: url('/img/party1.jpg'); /* imagem de fundo */
    }

    #party-2 { /* estilos do elemento com id "party-2" */
        background-image: url('/img/party2.jpg'); /* imagem de fundo */
    }

    #party-3 { /* estilos do elemento com id "party-3" */
        background-image: url('/img/party3.jpg'); /* imagem de fundo */
    }

    #party-4 { /* estilos do elemento com id "party-4" */
        background-image: url('/img/party4.jpg'); /* imagem de fundo */
    }

</style>
