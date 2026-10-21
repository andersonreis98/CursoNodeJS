<template>
  <!-- bloco com a classe "editparty" (usada para estilizar no CSS) -->
  <div class="editparty">
    <!-- título principal -->
    <h1>Edite a sua festa:</h1>
    <!-- componente do formulário de festa (reaproveitado na criação e na edição); o ":" (v-bind) faz o atributo party receber o valor de uma expressão JavaScript -->
    <PartyForm :party="party" page="editparty" btnText="Editar Festa" :key="componentKey"  />
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
    },
    // data: estado local do componente (variáveis usadas no template)
    data() {
        // retorna o objeto com os dados iniciais
        return {
            // party começa como objeto vazio
            party: {},
            // chave usada para forçar o componente filho a renderizar de novo (ao mudar o :key)
            componentKey: 0
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
            await fetch(`http://localhost:3000/api/party/userparty/${id}`, {
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

                // pega só AAAA-MM-DD, formato aceito pelo input type="date"
                this.party.partyDate = this.party.partyDate.substring(0, 10)

                // percorre as fotos da festa
                this.party.photos.forEach((photo, index) => {
                    // troca "public" pelo endereço da API para montar a URL da imagem
                    this.party.photos[index] = photo.replace("public", "http://localhost:3000");
                });

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
    .editparty { /* estilos dos elementos com a classe "editparty" */
        text-align: center; /* alinhamento horizontal do texto */
        padding-top: 40px; /* espaço interno em cima */
        padding-bottom: 100px; /* espaço interno embaixo */
    }

    .editparty h1 { /* estilos de "h1" que está dentro de ".editparty" */
        margin-bottom: 40px; /* espaço externo embaixo */
    }
</style>