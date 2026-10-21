// funções do Vue Router para criar as rotas
import { createRouter, createWebHistory } from 'vue-router'
// a Home é importada direto (carrega junto com a aplicação)
import Home from '../views/Home.vue'
// store, usada para saber se o usuário está logado
import store from '../store/index'

// lista de rotas: cada uma liga um caminho a um componente
const routes = [
  // rota /
  {
    path: '/',
    name: 'Home',
    component: Home,
    // meta: informações extras da rota; requiresAuth: false = página pública
    meta: {
        requiresAuth: false
    }
  },
  // rota /login
  {
    path: '/login',
    name: 'Login',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    // meta: informações extras da rota; requiresAuth: false = página pública
    meta: {
        requiresAuth: false
    }
  },
  // rota /register
  {
    path: '/register',
    name: 'Register',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    // meta: informações extras da rota; requiresAuth: false = página pública
    meta: {
        requiresAuth: false
    }
  },
  // rota /profile
  {
    path: '/profile',
    name: 'Profile',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    // requiresAuth: true = exige login (verificado no beforeEach)
    meta: {
        requiresAuth: true
    }
  },
  // rota /dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    // requiresAuth: true = exige login (verificado no beforeEach)
    meta: {
        requiresAuth: true
    }
  },
  // rota /newparty
  {
    path: '/newparty',
    name: 'NewParty',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "newparty" */ '../views/NewParty.vue'),
    // requiresAuth: true = exige login (verificado no beforeEach)
    meta: {
        requiresAuth: true
    }
  },
  // rota /editparty/:id
  {
    path: '/editparty/:id',
    name: 'Edit Party',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "editparty" */ '../views/EditParty.vue'),
    // requiresAuth: true = exige login (verificado no beforeEach)
    meta: {
        requiresAuth: true
    }
  },
  // rota /party/:id
  {
    path: '/party/:id',
    name: 'Party',
    // import() carrega o componente só quando a rota é acessada (lazy loading)
    component: () => import(/* webpackChunkName: "party" */ '../views/Party.vue'),
    // meta: informações extras da rota; requiresAuth: false = página pública
    meta: {
        requiresAuth: false
    }
  }
]

// cria o router
const router = createRouter({
  // URLs normais (sem #), usando o histórico do navegador
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// guarda de navegação: roda antes de cada troca de rota
router.beforeEach((to, from, next) => {
  // a rota de destino exige login?
  if(to.matched.some(record => record.meta.requiresAuth)) {
    // não está logado: manda para o login
    if (store.getters.authenticated === false) {
      next({
          path: '/login',
          // guarda a página que o usuário tentou abrir (params com path é ignorado no Vue Router 4)
          params: { nextUrl: to.fullPath }
      })
    } else {
      // logado: segue para a rota
      next()
    }
  } else {
      // rota pública: segue
      next()
  }
})

// exporta o router
export default router
