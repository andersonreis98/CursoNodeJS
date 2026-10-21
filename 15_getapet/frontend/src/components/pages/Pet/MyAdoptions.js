// instância do axios configurada com a URL da API
import api from '../../../utils/api'

// useState guarda dados; useEffect busca dados quando a página abre
import { useState, useEffect } from 'react'

// estilos (CSS Module)
import styles from './Dashboard.module.css'

// componente de imagem redonda
import RoundedImage from '../../layout/RoundedImage'

// página com os pets que o usuário pediu para adotar
function MyAdoptions() {
  // lista de pets (começa vazia)
  const [pets, setPets] = useState([])
  // token salvo no navegador (ou string vazia)
  const [token] = useState(localStorage.getItem('token') || '')

  // busca as adoções quando a página abre
  useEffect(() => {
    api
      .get('/pets/myadoptions', {
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

  // JSX da página
  return (
    <section>
      <div className={styles.petslist_header}>
        <h1>Minhas adoções</h1>
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
              {/* contato do dono do pet */}
              <div className={styles.contacts}>
                <p>
                  <span className="bold">Ligue para:</span> {pet.user.phone}
                </p>
                <p>
                  <span className="bold">Fale com:</span> {pet.user.name}
                </p>
              </div>
              <div className={styles.actions}>
                {/* ainda disponível = adoção em andamento; indisponível = adoção concluída */}
                {pet.available ? (
                  <p>Adoção em processo</p>
                ) : (
                  <p>Parabéns por concluir a adoção</p>
                )}
              </div>
            </div>
          ))}
        {/* lista vazia */}
        {pets.length === 0 && <p>Ainda não há pets adotados!</p>}
      </div>
    </section>
  )
}

// exporta o componente
export default MyAdoptions
