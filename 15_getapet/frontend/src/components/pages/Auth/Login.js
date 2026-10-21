// useState guarda os dados digitados; useContext lê o contexto do usuário
import { useState, useContext } from 'react'
// campo de formulário reutilizável
import Input from '../../form/Input'
// Link navega sem recarregar a página
import { Link } from 'react-router-dom'

// estilos do formulário (CSS Module)
import styles from '../../form/Form.module.css'

/* contextos */
// contexto com as funções de autenticação
import { Context } from '../../../context/UserContext'

// página de login
function Login() {
  // objeto com os dados digitados (começa vazio)
  const [user, setUser] = useState({})
  // pega a função login do contexto
  const { login } = useContext(Context)

  // atualiza o campo alterado usando o atributo name como chave
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // envio do formulário
  const handleSubmit = (e) => {
    // impede o recarregamento da página
    e.preventDefault()
    // chama o login do hook useAuth (requisição para a API)
    login(user)
  }

  // JSX da página
  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      {/* onSubmit chama handleSubmit quando o formulário é enviado */}
      <form onSubmit={handleSubmit}>
        {/* campo "E-mail" */}
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
        />
        {/* campo "Senha" */}
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a senha"
          handleOnChange={handleChange}
        />
        {/* botão de envio */}
        <input type="submit" value="Entrar" />
      </form>
      {/* link para a outra tela de autenticação */}
      <p>
        Não tem conta? <Link to="/register">Clique aqui.</Link>
      </p>
    </section>
  )
}

// exporta o componente
export default Login
