<template>
    <!-- bloco que agrupa elementos -->
    <div>
        <!-- componente de mensagem; recebe o texto e a classe por props; o ":" (v-bind) faz o atributo msg receber o valor de uma expressão JavaScript -->
        <Message :msg="msg" :msgClass="msgClass" />
        <!-- formulário; ao enviar, chama register (cadastro) ou update (perfil); $event é o evento de envio -->
        <form id="register-form" enctype="multipart/form-data" @submit="page === 'newparty' ? createParty($event) : update($event)">
            <!-- campo escondido "id": não aparece na tela; v-model liga o campo à variável id -->
            <input type="hidden" id="id" name="id" v-model="id">
            <!-- campo escondido "user_id": não aparece na tela; v-model liga o campo à variável user_id -->
            <input type="hidden" id="user_id" name="user_id" v-model="user_id">
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "title" -->
                <label for="title">Título do Evento:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "title"; v-model liga o campo à variável title (atualiza nos dois sentidos) -->
                <input type="text" id="title" name="title" v-model="title" placeholder="Digite o título">
            </div>
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "description" -->
                <label for="description">Descrição:</label>
                <!-- área de texto com várias linhas; enviada com o nome "description"; v-model liga o campo à variável description (atualiza nos dois sentidos) -->
                <textarea id="description" name="description" v-model="description" placeholder="O que vai acontecer ou o que já aconteceu?"></textarea>
            </div>
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "party_date" -->
                <label for="party_date">Data da Festa:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "party_date"; v-model liga o campo à variável party_date (atualiza nos dois sentidos) -->
                <input type="date" id="party_date" name="party_date" v-model="party_date">
            </div>
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "photos" -->
                <label for="photos">Imagens:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "photos"; ao mudar o valor, chama o método onChange -->
                <input type="file" multiple="multiple" id="photos" name="photos" ref="file" @change="onChange">
            </div>
            <!-- bloco que agrupa elementos; v-if: só renderiza se "page === 'editparty' && showMiniImages" for verdadeiro -->
            <div v-if="page === 'editparty' && showMiniImages" class="mini-images">
                <!-- parágrafo de texto -->
                <p>Imagens atuais:</p>
                <!-- imagem; v-for repete este elemento para cada item de photos -->
                <img v-for="(photo, index) in photos" :src="`${photo}`" :key="index">
            </div>
            <!-- bloco que agrupa elementos -->
            <div class="input-container checkbox-container">
                <!-- rótulo do campo "privacy" -->
                <label for="privacy">Evento privado</label>
                <!-- caixa de seleção (marcado/desmarcado); v-model liga o campo à variável privacy (atualiza nos dois sentidos) -->
                <input type="checkbox" multiple id="privacy" name="privacy" v-model="privacy">
            </div>
            <!-- componente de botão de envio; o texto vem por prop; o ":" (v-bind) faz o atributo text receber o valor de uma expressão JavaScript -->
            <InputSubmit :text="btnText" />
        </form>
    </div>
</template>

<script>
// importa o componente InputSubmit
import InputSubmit from './form/InputSubmit'
// importa o componente Message
import Message from './Message'

// objeto de configuração do componente (Options API do Vue)
export default {
  // nome do componente
  name: "RegisterForm",
  // components: componentes filhos usados no template
  components: {
    // registra o componente InputSubmit para usar como <InputSubmit /> no template
    InputSubmit,
    // registra o componente Message para usar como <Message /> no template
    Message
  },
  // data: estado local do componente (variáveis usadas no template)
  data() {
      // retorna o objeto com os dados iniciais
      return {
        // id começa com o valor de party._id (prop) ou null se não existir
        id: this.party._id || null,
        // title começa com o valor de party.title (prop) ou null se não existir
        title: this.party.title || null,
        // description começa com o valor de party.description (prop) ou null se não existir
        description: this.party.description || null,
        // party_date começa com o valor de party.partyDate (prop) ou null se não existir
        party_date: this.party.partyDate || null,
        // photos começa com o valor de party.photos (prop) ou null se não existir
        photos: this.party.photos || null,
        // privacy começa com o valor de party.privacy (prop) ou false se não existir
        privacy: this.party.privacy || false,
        // user_id começa com o valor de party.userId (prop) ou null se não existir
        user_id: this.party.userId || null,
        // texto/classe da mensagem (null = nenhuma mensagem)
        msg: null,
        // texto/classe da mensagem (null = nenhuma mensagem)
        msgClass: null,
        // controla se as miniaturas das fotos atuais aparecem
        showMiniImages: true,
      }
  },
  // props: dados recebidos do componente pai
  props: ["party", "page", "btnText"],
  // methods: funções do componente
  methods: {
      // método assíncrono createParty (usa await para esperar a API)
      async createParty(e) {
        
        // impede o comportamento padrão do evento (ex.: recarregar a página ao enviar o form)
        e.preventDefault();

        // FormData monta um corpo multipart/form-data (necessário para enviar arquivos)
        const formData = new FormData();

        // adiciona o campo "title" ao FormData
        formData.append('title', this.title);
        // adiciona o campo "description" ao FormData
        formData.append('description', this.description);
        // adiciona o campo "party_date" ao FormData
        formData.append('party_date', this.party_date);
        // adiciona o campo "privacy" ao FormData
        formData.append('privacy', this.privacy);

        // se o usuário escolheu fotos
        if(this.photos.length > 0) {
            // percorre os arquivos escolhidos
            for (const i of Object.keys(this.photos)) {
                // adiciona o campo "photos" ao FormData
                formData.append('photos', this.photos[i])
            }
        }

        // pega o token do estado (store)
        const token = this.$store.getters.token;

        // requisição HTTP com fetch (espera a resposta)
        await fetch("http://localhost:3000/api/party", {
            // método HTTP POST
            method: "POST",
            // cabeçalhos da requisição
            headers: {
                // envia o token no cabeçalho auth-token (lido pelo check-token do backend)
                "auth-token": token
            },
            // corpo da requisição
            body: formData
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

                // redireciona
                if(!data.error) {                    
                    // navega para dashboard
                    this.$router.push('dashboard');
                }
                
            // fim do setTimeout: espera 2000 ms (2 s) antes de executar
            }, 2000);

        })
        // trata o erro caso a Promise falhe
        .catch((err) => {
            // mostra o erro no terminal
            console.log(err);
        })

    
      },
      // método onChange; "e" é o evento do navegador
      onChange(e) {

        // atualiza photos no estado do componente
        this.photos = e.target.files;
        // guarda false na propriedade showMiniImages do objeto
        this.showMiniImages = false;

      },
      // método assíncrono update (usa await para esperar a API)
      async update(e) {

        // impede o comportamento padrão do evento (ex.: recarregar a página ao enviar o form)
        e.preventDefault();

        // FormData monta um corpo multipart/form-data (necessário para enviar arquivos)
        const formData = new FormData();

        // adiciona o campo "id" ao FormData
        formData.append('id', this.id);
        // adiciona o campo "title" ao FormData
        formData.append('title', this.title);
        // adiciona o campo "description" ao FormData
        formData.append('description', this.description);
        // adiciona o campo "partyDate" ao FormData
        formData.append('partyDate', this.party_date);
        // adiciona o campo "privacy" ao FormData
        formData.append('privacy', this.privacy);
        // adiciona o campo "user_id" ao FormData
        formData.append('user_id', this.user_id);

        // se o usuário escolheu fotos
        if(this.photos.length > 0) {
            // percorre os arquivos escolhidos
            for (const i of Object.keys(this.photos)) {
                // adiciona o campo "photos" ao FormData
                formData.append('photos', this.photos[i])
            }
        }

        // pega o token do estado (store)
        const token = this.$store.getters.token;

        // requisição HTTP com fetch (espera a resposta)
        await fetch("http://localhost:3000/api/party", {
            // método HTTP PUT
            method: "PUT",
            // cabeçalhos da requisição
            headers: {
                // envia o token no cabeçalho auth-token (lido pelo check-token do backend)
                "auth-token": token 
            },
            // corpo da requisição
            body: formData
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

        })
        // trata o erro caso a Promise falhe
        .catch((err) => {
            // mostra o erro no terminal
            console.log(err);
        })

        // executa depois de um tempo
        setTimeout(() => {

            // guarda null na propriedade msg do objeto
            this.msg = null;     
            
        // fim do setTimeout: espera 2000 ms (2 s) antes de executar
        }, 2000);

    }
  }
}
</script>

<style scoped>
    #register-form { /* estilos do elemento com id "register-form" */
        max-width: 400px; /* largura máxima */
        margin: 0 auto; /* espaço externo (fora da borda) */
        display: flex; /* tipo de exibição (flex, block, inline, grid...) */
        flex-direction: column; /* direção dos itens no flex (linha ou coluna) */
    }

    .input-container { /* estilos dos elementos com a classe "input-container" */
        display: flex; /* tipo de exibição (flex, block, inline, grid...) */
        flex-direction: column; /* direção dos itens no flex (linha ou coluna) */
        margin-bottom: 15px; /* espaço externo embaixo */
        text-align: left; /* alinhamento horizontal do texto */
    }

    .input-container label { /* estilos de "label" que está dentro de ".input-container" */
        margin-bottom: 10px; /* espaço externo embaixo */
        color: #555; /* cor do texto */
    }

    .input-container input, /* seletor ".input-container input" (continua na linha de baixo: as regras valem para todos) */
    .input-container textarea { /* estilos de "textarea" que está dentro de ".input-container" */
        padding: 10px; /* espaço interno (entre o conteúdo e a borda) */
        border: 1px solid #e8e8e8; /* borda (espessura, estilo e cor) */
    }

    .checkbox-container { /* estilos dos elementos com a classe "checkbox-container" */
        flex-direction: row; /* direção dos itens no flex (linha ou coluna) */
    }

    .checkbox-container input[type='checkbox'] { /* estilos de "input[type='checkbox']" que está dentro de ".checkbox-container" */
        margin-left: 12px; /* espaço externo à esquerda */
        margin-top: 3px; /* espaço externo em cima */
    }

    .mini-images { /* estilos dos elementos com a classe "mini-images" */
        display: flex; /* tipo de exibição (flex, block, inline, grid...) */
        flex-wrap: wrap; /* permite os itens quebrarem para a linha seguinte */
        margin-bottom: 0px; /* espaço externo embaixo */
    }

    .mini-images p { /* estilos de "p" que está dentro de ".mini-images" */
        width: 100%; /* largura */
        font-weight: bold; /* espessura da fonte (bold = negrito) */
        margin-bottom: 15px; /* espaço externo embaixo */
        text-align: left; /* alinhamento horizontal do texto */
    }

    .mini-images img { /* estilos de "img" que está dentro de ".mini-images" */
        height: 50px; /* altura */
        margin-right: 15px; /* espaço externo à direita */
        margin-bottom: 15px; /* espaço externo embaixo */
    }
    
</style>