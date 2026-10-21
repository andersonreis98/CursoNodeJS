// instância do axios configurada com a URL da API
import api from '../../../utils/api'

// Link navega sem recarregar
import { Link } from 'react-router-dom'
// useState guarda dados; useEffect busca dados quando a página abre
import { useState, useEffect } from 'react'

// estilos (CSS Module)
import styles from './Dashboard.module.css'

// componente de imagem redonda
import RoundedImage from '../../layout/RoundedImage'

/* hooks */
// hook das mensagens flash
import useFlashMessage from '../../../hooks/useFlashMessage'

// página com os pets cadastrados pelo usuário
function MyPets() {
  // lista de pets (começa vazia)
  const [pets, setPets] = useState([])
  // token salvo no navegador (ou string vazia)
  const [token] = useState(localStorage.getItem('token') || '')
  // função para mostrar mensagens
  const { setFlashMessage } = useFlashMessage()

  // busca os pets do usuário quando a página abre
  useEffect(() => {
    api
      .get('/pets/mypets', {
        // cabeçalhos da requisição
        headers: {
          // envia o token no formato "Bearer <token>" (JSON.parse remove as aspas salvas pelo stringify)
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      // guarda a lista recebida
      .then((response) => {
        setPets(response.data.pets)
      })
  }, [token])

  // remove um pet
  async function removePet(id) {
    // tipo da mensagem (vira 'error' se a requisição falhar)
    let msgType = 'success'

    // faz a requisição e guarda os dados da resposta (de sucesso ou de erro)
    const data = await api
      // DELETE /pets/:id
      .delete(`/pets/${id}`, {
        // cabeçalhos da requisição
        headers: {
          // envia o token no formato "Bearer <token>" (JSON.parse remove as aspas salvas pelo stringify)
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      // sucesso: tira o pet removido da lista na tela, sem buscar tudo de novo
      .then((response) => {
        const updatedPets = pets.filter((pet) => pet._id != id)
        setPets(updatedPets)
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

  // conclui a adoção de um pet
  async function concludeAdoption(id) {
    // tipo da mensagem (vira 'error' se a requisição falhar)
    let msgType = 'success'

    // faz a requisição e guarda os dados da resposta (de sucesso ou de erro)
    const data = await api
      // atenção: no patch o 2º argumento é o corpo; o objeto { headers } vai como dados e o token não é enviado por aqui
      .patch(`/pets/conclude/${id}`, {
        // cabeçalhos da requisição
        headers: {
          // envia o token no formato "Bearer <token>" (JSON.parse remove as aspas salvas pelo stringify)
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      // sucesso: devolve os dados da resposta
      .then((response) => {
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
      <div className={styles.petslist_header}>
        <h1>Meus Pets Cadastrados</h1>
        {/* link para cadastrar um novo pet */}
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>
      <div className={styles.petslist_container}>
        {/* um item para cada pet */}
        {pets.length > 0 &&
          pets.map((pet) => (
            <div key={pet._id} className={styles.petlist_row}>
              <RoundedImage
                src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width="px75"
              />
              <span className="bold">{pet.name}</span>
              <div className={styles.actions}>
                {/* pet disponível: mostra as ações; adotado: só o aviso */}
                {pet.available ? (
                  <>
                    {/* botão de concluir só aparece se alguém agendou visita */}
                    {pet.adopter && (
                      <button
                        className={styles.conclude_btn}
                        onClick={() => {
                          concludeAdoption(pet._id)
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}

                    {/* link para a edição */}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    {/* botão de excluir */}
                    <button
                      onClick={() => {
                        removePet(pet._id)
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </div>
            </div>
          ))}
        {/* lista vazia */}
        {pets.length === 0 && <p>Ainda não há pets cadastrados!</p>}
      </div>
    </section>
  )
}

// exporta o componente
export default MyPets
