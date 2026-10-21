// instância do axios configurada com a URL da API
import api from '../../../utils/api'

// useState guarda dados no componente
import { useState } from 'react'
// useHistory permite navegar pelo código
import { useHistory } from 'react-router-dom'

// estilos (CSS Module)
import styles from './AddPet.module.css'

// formulário de pet reutilizável
import PetForm from '../../form/PetForm'

/* hooks */
// hook das mensagens flash
import useFlashMessage from '../../../hooks/useFlashMessage'

// página de cadastro de pet
function AddPet() {
  // token salvo no navegador (ou string vazia)
  const [token] = useState(localStorage.getItem('token') || '')
  // função para mostrar mensagens
  const { setFlashMessage } = useFlashMessage()
  // objeto de navegação
  const history = useHistory()

  // chamada pelo PetForm ao enviar; recebe os dados do pet
  async function registerPet(pet) {
    // tipo da mensagem (vira 'error' se a requisição falhar)
    let msgType = 'success'

    // FormData monta um corpo multipart/form-data, necessário para enviar arquivos
    const formData = new FormData()

    // percorre cada campo do pet (forEach não retorna nada, então petFormData fica undefined)
    const petFormData = await Object.keys(pet).forEach((key) => {
      // imagens: adiciona um arquivo por vez com o mesmo nome "images"
      if (key === 'images') {
        for (let i = 0; i < pet[key].length; i++) {
          formData.append(`images`, pet[key][i])
        }
      } else {
        // demais campos: adiciona o valor com o nome do campo
        formData.append(key, pet[key])
      }
    })

    // adiciona um campo "pet" com valor "undefined" (linha desnecessária)
    formData.append('pet', petFormData)

    // faz a requisição e guarda os dados da resposta (de sucesso ou de erro)
    const data = await api
      // POST /pets/create com o FormData
      .post(`pets/create`, formData, {
        headers: {
          // token de autenticação
          Authorization: `Bearer ${JSON.parse(token)}`,
          // corpo com arquivos
          'Content-Type': 'multipart/form-data',
        },
      })
      // sucesso: devolve os dados da resposta
      .then((response) => {
        console.log(response.data)
        return response.data
      })
      // erro: marca como erro e devolve a mensagem enviada pela API
      .catch((err) => {
        console.log(err)
        msgType = 'error'
        return err.response.data
      })

    // mostra a mensagem
    setFlashMessage(data.message, msgType)
    // vai para a lista de pets do usuário
    history.push('/pet/mypets')
  }

  // JSX da página
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Cadastre um Pet</h1>
        <p>Depois ele ficará disponível para adoção</p>
      </div>
      {/* formulário: ao enviar, chama registerPet */}
      <PetForm handleSubmit={registerPet} btnText="Cadastrar" />
    </section>
  )
}

// exporta o componente
export default AddPet
