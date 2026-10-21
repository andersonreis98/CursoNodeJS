// instância do axios configurada com a URL da API
import api from '../utils/api'

// useState guarda estados; useEffect executa código quando o componente é montado
import { useState, useEffect } from 'react'
// useHistory permite navegar entre páginas pelo código (React Router v5)
import { useHistory } from 'react-router-dom'
// hook das mensagens flash
import useFlashMessage from './useFlashMessage'

// hook com toda a lógica de autenticação
export default function useAuth() {
  // se o usuário está logado
  const [authenticated, setAuthenticated] = useState(false)
  // true enquanto ainda verifica se há token salvo
  const [loading, setLoading] = useState(true)
  // objeto de navegação
  const history = useHistory()
  // função para mostrar mensagens
  const { setFlashMessage } = useFlashMessage()

  // executa uma vez, quando a aplicação carrega ([] = sem dependências)
  useEffect(() => {
    // procura o token salvo no navegador
    const token = localStorage.getItem('token')

    // se existe, envia o token em todas as requisições e marca como logado
    if (token) {
      // o token foi salvo com JSON.stringify, por isso o JSON.parse
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }

    // terminou a verificação
    setLoading(false)
  }, [])

  // cadastro
  async function register(user) {
    // mensagem padrão (sucesso)
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'

    // tenta cadastrar
    try {
      // POST para a API; then extrai só os dados da resposta
      const data = await api.post('/users/register', user).then((response) => {
        return response.data
      })

      // salva o token e redireciona
      await authUser(data)
    // a API respondeu com erro (ex.: 422)
    } catch (error) {
      // tratar erro
      // usa a mensagem de erro enviada pelo backend
      msgText = error.response.data.message
      msgType = 'error'
    }

    // mostra a mensagem
    setFlashMessage(msgText, msgType)
  }

  // login
  async function login(user) {
    // mensagem padrão (sucesso)
    let msgText = 'Login realizado com sucesso!'
    let msgType = 'success'

    // tenta fazer login
    try {
      // POST para a API com e-mail e senha
      const data = await api.post('/users/login', user).then((response) => {
        return response.data
      })

      // salva o token e redireciona
      await authUser(data)
    // erro de login
    } catch (error) {
      // tratar erro
      msgText = error.response.data.message
      msgType = 'error'
    }

    // mostra a mensagem
    setFlashMessage(msgText, msgType)
  }

  // guarda o token e marca o usuário como logado
  async function authUser(data) {
    // atualiza o estado
    setAuthenticated(true)
    // salva o token no navegador (persiste mesmo ao fechar a aba)
    // atenção: aqui não é definido api.defaults.headers.Authorization; as páginas enviam o token manualmente
    localStorage.setItem('token', JSON.stringify(data.token))

    // vai para a página inicial
    history.push('/')
  }

  // logout
  function logout() {
    // mensagem de sucesso
    const msgText = 'Logout realizado com sucesso!'
    const msgType = 'success'

    // marca como deslogado
    setAuthenticated(false)
    // apaga o token salvo
    localStorage.removeItem('token')
    // para de enviar o token nas requisições
    api.defaults.headers.Authorization = undefined
    // vai para a tela de login
    history.push('/login')

    // mostra a mensagem
    setFlashMessage(msgText, msgType)
  }

  // o que o hook disponibiliza
  return { authenticated, loading, register, login, logout }
}
