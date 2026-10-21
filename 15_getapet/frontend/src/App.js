// componentes de rotas do React Router v5 (BrowserRouter, Switch e Route)
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// importa o React
import React from 'react'

/* componentes */
// barra de navegação
import Navbar from './components/layout/Navbar'
// rodapé
import Footer from './components/layout/Footer'
// mensagem flash (sucesso/erro)
import Message from './components/layout/Message'
// container que envolve o conteúdo das páginas
import Container from './components/layout/Container'

/* páginas */
import Home from './components/pages/Home'
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Profile from './components/pages/User/Profile'
import AddPet from './components/pages/Pet/AddPet'
import MyPets from './components/pages/Pet/MyPets'
import EditPet from './components/pages/Pet/EditPet'
import PetDetails from './components/pages/Pet/PetDetails'
import MyAdoptions from './components/pages/Pet/MyAdoptions'

/* contextos */
// provider que compartilha os dados de autenticação com toda a aplicação
import { UserProvider } from './context/UserContext'
// componente principal
function App() {
  // JSX: parece HTML, mas é JavaScript
  return (
    // Router habilita a navegação entre páginas sem recarregar
    <Router>
      {/* UserProvider deixa login/logout/authenticated disponíveis para todos os componentes de dentro */}
      <UserProvider>
        {/* aparece em todas as páginas */}
        <Navbar />
        {/* mensagens flash */}
        <Message />
        <Container>
          {/* Switch renderiza só a PRIMEIRA rota que combinar com a URL */}
          <Switch>
            {/* /login -> página de login */}
            <Route path="/login">
              <Login />
            </Route>
            {/* /register -> cadastro */}
            <Route path="/register">
              <Register />
            </Route>
            {/* /user/profile -> perfil do usuário */}
            <Route path="/user/profile">
              <Profile />
            </Route>
            {/* /pet/add -> cadastrar pet */}
            <Route path="/pet/add">
              <AddPet />
            </Route>
            {/* /pet/edit/:id -> editar pet (:id é um parâmetro) */}
            <Route path="/pet/edit/:id">
              <EditPet />
            </Route>
            {/* /pet/mypets -> pets do usuário */}
            <Route path="/pet/mypets">
              <MyPets />
            </Route>
            {/* /pet/myadoptions -> adoções do usuário */}
            <Route path="/pet/myadoptions">
              <MyAdoptions />
            </Route>
            {/* /pet/:id -> detalhes; fica depois das rotas fixas de /pet para não capturá-las */}
            <Route path="/pet/:id">
              <PetDetails />
            </Route>
            {/* "/" combina com qualquer URL, por isso fica por último */}
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Container>
        {/* aparece em todas as páginas */}
        <Footer />
      </UserProvider>
    </Router>
  )
}

// exporta o componente
export default App
