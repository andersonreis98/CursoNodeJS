// instância do axios configurada com a URL da API
import api from '../../../utils/api'

// useState guarda dados; useEffect busca dados quando a página abre
import { useState, useEffect } from 'react'
// useParams lê parâmetros da URL; Link navega sem recarregar
import { useParams, Link } from 'react-router-dom'

// estilos (CSS Module)
import styles from './PetDetails.module.css'

/* hooks */
// hook das mensagens flash
import useFlashMessage from '../../../hooks/useFlashMessage'

// página de detalhes de um pet
function PetDetails() {
  // dados do pet (começa vazio)
  const [pet, setPet] = useState({})
  // id do pet vindo da URL
  const { id } = useParams()
  // função para mostrar mensagens
  const { setFlashMessage } = useFlashMessage()
  // token salvo no navegador (ou string vazia)
  const [token] = useState(localStorage.getItem('token') || '')

  // busca o pet quando a página abre (rota pública, sem token)
  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => {
      setPet(response.data.pet)
    })
  }, [id])

  // agenda uma visita
  async function schedule() {
    // tipo da mensagem (vira 'error' se a requisição falhar)
    let msgType = 'success'

    // faz a requisição e guarda os dados da resposta (de sucesso ou de erro)
    const data = await api
      // atenção: no patch o 2º argumento é o corpo; o objeto { headers } vai como dados e o token não é enviado por aqui
      .patch(`pets/schedule/${pet._id}`, {
        // cabeçalhos da requisição
        headers: {
          // envia o token no formato "Bearer <token>" (JSON.parse remove as aspas salvas pelo stringify)
          Authorization: `Bearer ${JSON.parse(token)}`,
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
    // Fragment: agrupa sem criar elemento extra
    <>
      {/* só renderiza depois que os dados do pet chegaram */}
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.petdetails_header}>
            <h1>Conhecendo o Pet: {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo!</p>
          </div>
          <div className={styles.pet_images}>
            {/* uma <img> para cada imagem do pet */}
            {pet.images.map((image, index) => (
              <img
                key={index}
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
              />
            ))}
          </div>
          <p>
            <span className="bold">Peso:</span> {pet.weight}kg
          </p>
          <p>
            <span className="bold">Idade:</span> {pet.age} anos
          </p>
          {/* logado: botão de agendar; deslogado: convite para criar conta */}
          {token ? (
            <button onClick={schedule}>Solicitar uma Visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </section>
      )}
    </>
  )
}

// exporta o componente
export default PetDetails
