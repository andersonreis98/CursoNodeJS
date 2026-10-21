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

// página de cadastro
function Register() {
  // objeto com os dados digitados (começa vazio)
  const [user, setUser] = useState({})
  // pega a função register do contexto
  const { register } = useContext(Context)

  // atualiza o campo alterado usando o atributo name como chave
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // envio do formulário
  function handleSubmit(e) {
    // impede o recarregamento da página
    e.preventDefault()
    // chama o cadastro do hook useAuth (requisição para a API)
    register(user)
  }

  // JSX da página
  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      {/* onSubmit chama handleSubmit quando o formulário é enviado */}
      <form onSubmit={handleSubmit}>
        {/* campo "Nome" */}
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o seu nome"
          handleOnChange={handleChange}
        />
        {/* campo "Telefone" */}
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
        />
        {/* campo "E-mail" */}
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o seu e-mail"
          handleOnChange={handleChange}
        />
        {/* campo "Senha" */}
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        {/* campo "Confirmação de senha" */}
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        {/* botão de envio */}
        <input type="submit" value="Cadastrar" />
      </form>
      {/* link para a outra tela de autenticação */}
      <p>
        Já tem conta? <Link to="/login">Clique aqui.</Link>
      </p>
    </section>
  )
}

// exporta o componente
export default Register
