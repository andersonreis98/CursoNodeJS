// instância do axios configurada com a URL da API
import api from '../../../utils/api'

// useState guarda dados; useEffect busca dados quando a página abre
import { useState, useEffect } from 'react'
// useParams lê os parâmetros da URL (ex.: :id)
import { useParams } from 'react-router-dom'

// estilos (CSS Module)
import styles from './AddPet.module.css'

// formulário de pet reutilizável
import PetForm from '../../form/PetForm'

/* hooks */
// hook das mensagens flash
import useFlashMessage from '../../../hooks/useFlashMessage'

// página de edição de pet
function EditPet() {
  // dados do pet (começa vazio)
  const [pet, setPet] = useState({})
  // token salvo no navegador (ou string vazia)
  const [token] = useState(localStorage.getItem('token') || '')
  // id do pet vindo da URL
  const { id } = useParams()
  // função para mostrar mensagens
  const { setFlashMessage } = useFlashMessage()

  // busca os dados do pet quando a página abre (ou quando token/id mudam)
  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        // cabeçalhos da requisição
        headers: {
          // envia o token no formato "Bearer <token>" (JSON.parse remove as aspas salvas pelo stringify)
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      // guarda o pet recebido
      .then((response) => {
        setPet(response.data.pet)
      })
  }, [token, id])

  // chamada pelo PetForm ao enviar
  async function updatePet(pet) {
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
      // PATCH /pets/:id com o FormData
      .patch(`pets/${pet._id}`, formData, {
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
  }

  // JSX da página
  return (
    <section>
      <div className={styles.addpet_header}>
        <h1>Editando o Pet: {pet.name}</h1>
        <p>Depois da edição os dados serão atualizados no sistema</p>
      </div>
      {/* só mostra o formulário depois que os dados do pet chegaram */}
      {pet.name && (
        <PetForm handleSubmit={updatePet} petData={pet} btnText="Editar" />
      )}
    </section>
  )
}

// exporta o componente
export default EditPet
