// instância do axios configurada com a URL da API
import api from '../../../utils/api'

// campo de formulário reutilizável
import Input from '../../form/Input'

// hooks do React
import { useState, useEffect } from 'react'

// estilos da página e do formulário (CSS Modules)
import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

/* hooks */
// mensagens flash
import useFlashMessage from '../../../hooks/useFlashMessage'
// componente de imagem redonda
import RoundedImage from '../../layout/RoundedImage'

// página de perfil do usuário
function Profile() {
  // dados do usuário (preenchidos com a resposta da API)
  const [user, setUser] = useState({})
  // arquivo escolhido para a nova foto (pré-visualização)
  const [preview, setPreview] = useState()
  // token salvo no navegador (ou string vazia)
  const [token] = useState(localStorage.getItem('token') || '')
  // função de mensagens
  const { setFlashMessage } = useFlashMessage()

  // busca os dados do usuário logado quando a página abre (e se o token mudar)
  useEffect(() => {
    api
      // GET /users/checkuser enviando o token no cabeçalho
      .get('/users/checkuser', {
        // cabeçalhos da requisição
        headers: {
          // envia o token no formato "Bearer <token>" (JSON.parse remove as aspas salvas pelo stringify)
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      // guarda o usuário recebido
      .then((response) => {
        setUser(response.data)
      })
  }, [token])

  // atualiza o campo alterado
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // quando escolhe uma nova foto
  function onFileChange(e) {
    // guarda o arquivo para a pré-visualização
    setPreview(e.target.files[0])
    // guarda o arquivo no objeto user (campo "image")
    setUser({ ...user, [e.target.name]: e.target.files[0] })
  }

  // envio do formulário
  const handleSubmit = async (e) => {
    // impede o recarregamento da página
    e.preventDefault()

    // tipo da mensagem (muda para 'error' se falhar)
    let msgType = 'success'

    // FormData monta um corpo multipart/form-data, necessário para enviar arquivos
    const formData = new FormData()

    // adiciona cada campo do user ao FormData (forEach não retorna nada, então userFormData fica undefined)
    const userFormData = await Object.keys(user).forEach((key) =>
      formData.append(key, user[key]),
    )

    // adiciona um campo "user" com valor "undefined" (linha desnecessária)
    formData.append('user', userFormData)

    // envia a atualização para a API
    const data = await api
      // PATCH /users/edit/:id com o FormData
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          // token de autenticação
          Authorization: `Bearer ${JSON.parse(token)}`,
          // tipo do corpo (arquivos + campos)
          'Content-Type': 'multipart/form-data',
        },
      })
      // sucesso: devolve os dados da resposta
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      // erro: marca como erro e devolve a resposta de erro da API
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    // mostra a mensagem (sucesso ou erro)
    setFlashMessage(data.message, msgType)
  }

  return (
    <section>
      <div className={styles.profile_header}>
        <h1>Perfil</h1>
        {/* mostra a foto se o usuário já tem uma ou escolheu uma nova */}
        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : `${process.env.REACT_APP_API}/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
      </div>
      {/* formulário de edição */}
      <form onSubmit={handleSubmit} className={formStyles.form_container}>
        {/* nova foto */}
        <Input
          text="Imagem"
          type="file"
          name="image"
          handleOnChange={onFileChange}
        />
        {/* e-mail (começa preenchido com o valor atual) */}
        <Input
          text="E-mail"
          type="email"
          name="email"
          placeholder="Digite o e-mail"
          handleOnChange={handleChange}
          value={user.email || ''}
        />
        {/* nome */}
        <Input
          text="Nome"
          type="text"
          name="name"
          placeholder="Digite o nome"
          handleOnChange={handleChange}
          value={user.name || ''}
        />
        {/* telefone */}
        <Input
          text="Telefone"
          type="text"
          name="phone"
          placeholder="Digite o seu telefone"
          handleOnChange={handleChange}
          value={user.phone || ''}
        />
        {/* nova senha (opcional) */}
        <Input
          text="Senha"
          type="password"
          name="password"
          placeholder="Digite a sua senha"
          handleOnChange={handleChange}
        />
        {/* confirmação da nova senha */}
        <Input
          text="Confirmação de senha"
          type="password"
          name="confirmpassword"
          placeholder="Confirme a sua senha"
          handleOnChange={handleChange}
        />
        {/* botão de envio */}
        <input type="submit" value="Editar" />
      </form>
    </section>
  )
}

// exporta o componente
export default Profile
