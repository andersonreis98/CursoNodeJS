// createApp cria a aplicação Vue 3
import { createApp } from 'vue'
// componente raiz
import App from './App.vue'
// rotas da aplicação
import router from './router'
// store do Vuex (estado global: login, token...)
import store from './store/index'

// cria a aplicação e registra o router
const app = createApp(App).use(router)

// registra a store
app.use(store)

// monta a aplicação na <div id="app"> do public/index.html
app.mount('#app')
