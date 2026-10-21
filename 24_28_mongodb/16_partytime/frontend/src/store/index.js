// createStore cria a store do Vuex (estado compartilhado entre os componentes)
import { createStore } from 'vuex'
// vuex-persist salva o estado no navegador para não perder ao recarregar a página
import VuexPersistence from 'vuex-persist'

// configura a persistência no localStorage
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// cria e exporta a store
export default createStore({
  // estado inicial
  state() {
    return {
      // se o usuário está logado
      authenticated: false,
      // token JWT
      token: null,
      // id do usuário logado
      userId: null
    }
  },
  // mutations: únicas funções que podem alterar o estado (chamadas com commit)
  mutations: {
    // login: guarda o token e o id
    authenticate(state, data) {
      state.authenticated = true
      state.token = data.token
      state.userId = data.userId
    },
    // logout: limpa os dados
    logout(state) {
      state.authenticated = false
      state.token = null
      state.userId = null
    },
  },
  // getters: forma de ler o estado (como propriedades computadas)
  getters: {
    authenticated: state => state.authenticated,
    token: state => state.token,
    userId: state => state.userId
  },
  // plugins da store: aqui a persistência no localStorage
  plugins: [vuexLocal.plugin]
})