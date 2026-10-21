<template>
    <!-- bloco que agrupa elementos -->
    <div>
        <!-- componente de mensagem; recebe o texto e a classe por props; o ":" (v-bind) faz o atributo msg receber o valor de uma expressão JavaScript -->
        <Message :msg="msg" :msgClass="msgClass" />
        <!-- formulário; ao enviar, chama register (cadastro) ou update (perfil); $event é o evento de envio -->
        <form id="user-form" @submit="page === 'register' ? register($event) : update($event)">
            <!-- campo escondido "id": não aparece na tela; v-model liga o campo à variável id -->
            <input type="hidden" id="id" name="id" v-model="id">
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "name" -->
                <label for="name">Nome:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "name"; v-model liga o campo à variável name (atualiza nos dois sentidos) -->
                <input type="text" id="name" name="name" v-model="name" placeholder="Digite o seu nome">
            </div>
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "email" -->
                <label for="email">Email:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "email"; v-model liga o campo à variável email (atualiza nos dois sentidos) -->
                <input type="email" id="email" name="email" v-model="email"  placeholder="Digite o seu e-mail">
            </div>
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "password" -->
                <label for="password">Senha:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "password"; v-model liga o campo à variável password (atualiza nos dois sentidos) -->
                <input type="password" id="password" name="password" v-model="password"  placeholder="Digite sua senha">
            </div>
            <!-- bloco com a classe "input-container" (usada para estilizar no CSS) -->
            <div class="input-container">
                <!-- rótulo do campo "confirmpassword" -->
                <label for="confirmpassword">Confirmação:</label>
                <!-- campo de entrada; o valor chega no servidor com o nome "confirmpassword"; v-model liga o campo à variável confirmpassword (atualiza nos dois sentidos) -->
                <input type="password" id="confirmpassword" name="confirmpassword" v-model="confirmpassword"  placeholder="Confirme sua senha">
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
import Message from './Message';

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
        // id começa com o valor de user._id (prop) ou null se não existir
        id: this.user._id || null,
        // name começa com o valor de user.name (prop) ou null se não existir
        name: this.user.name || null,
        // email começa com o valor de user.email (prop) ou null se não existir
        email: this.user.email || null,
        // senha do banco
        password: null,
        // valor do campo confirmpassword (começa vazio)
        confirmpassword: null,
        // texto/classe da mensagem (null = nenhuma mensagem)
        msg: null,
        // texto/classe da mensagem (null = nenhuma mensagem)
        msgClass: null,
    }
  },
  // props: dados recebidos do componente pai
  props: ["user", "page", "btnText"],
  // methods: funções do componente
  methods: {
    // método assíncrono register (usa await para esperar a API)
    async register(e) {
        // impede o comportamento padrão do evento (ex.: recarregar a página ao enviar o form)
        e.preventDefault();

        // monta o objeto data
        const data = {
            // campo name recebe o valor guardado no objeto
            name: this.name,
            // campo email recebe o valor guardado no objeto
            email: this.email,
            // senha do banco
            password: this.password,
            // campo confirmpassword recebe o valor guardado no objeto
            confirmpassword: this.confirmpassword
        }

        // converte o objeto em texto JSON para enviar
        const jsonData = JSON.stringify(data);

        // requisição HTTP com fetch (espera a resposta)
        await fetch("http://localhost:3000/api/auth/register", {
            // método HTTP POST
            method: "POST",
            // cabeçalhos da requisição
            headers: { "Content-type": "application/json" },
            // corpo da requisição
            body: jsonData
        })
        // converte a resposta em JSON
        .then((resp) => resp.json())
        // data é o JSON devolvido pela API
        .then((data) => {

            // variável auth
            let auth = false;

            // a API devolveu erro
            if(data.error) {
                // mensagem exibida na tela
                this.msg = data.error;
                // classe CSS da mensagem (error)
                this.msgClass = "error";
            // caso contrário
            } else {
                // a requisição precisa de token
                auth = true;
                // mensagem exibida na tela
                this.msg = data.msg;
                // classe CSS da mensagem (success)
                this.msgClass = "success";

                // Dispara a mutation que autentica o usuário
                this.$store.commit("authenticate", {token: data.token, userId: data.userId});
            }
            
            // executa depois de um tempo
            setTimeout(() => {

                // se auth não existe (null/undefined)
                if(!auth) {
                    // guarda null na propriedade msg do objeto
                    this.msg = null;                                   
                // caso contrário
                } else {
                    // redireciona
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
    // método assíncrono update (usa await para esperar a API)
    async update(e) {
        // impede o comportamento padrão do evento (ex.: recarregar a página ao enviar o form)
        e.preventDefault();

        // monta o objeto data
        const data = {
            // campo id recebe o valor guardado no objeto
            id: this.id,
            // campo name recebe o valor guardado no objeto
            name: this.name,
            // campo email recebe o valor guardado no objeto
            email: this.email,
            // senha do banco
            password: this.password,
            // campo confirmpassword recebe o valor guardado no objeto
            confirmpassword: this.confirmpassword
        }

        // converte o objeto em texto JSON para enviar
        const jsonData = JSON.stringify(data);

        // pega o token do estado (store)
        const token = this.$store.getters.token;

        // requisição HTTP com fetch (espera a resposta)
        await fetch("http://localhost:3000/api/user", {
            // método HTTP PUT
            method: "PUT",
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
    #user-form { /* estilos do elemento com id "user-form" */
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

    .input-container input { /* estilos de "input" que está dentro de ".input-container" */
        padding: 10px; /* espaço interno (entre o conteúdo e a borda) */
        border: 1px solid #e8e8e8; /* borda (espessura, estilo e cor) */
    }
    
</style>