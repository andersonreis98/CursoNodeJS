// instância do axios configurada com a URL da API
import api from '../../utils/api'

// Link navega sem recarregar
import { Link } from 'react-router-dom'
// useState guarda a lista de pets; useEffect busca os dados ao abrir a página
import { useState, useEffect } from 'react'

// estilos da página (CSS Module)
import styles from './Home.module.css'

// página inicial: lista os pets
function Home() {
  // lista de pets (começa vazia)
  const [pets, setPets] = useState([])

  // executa uma vez ao montar a página
  useEffect(() => {
    // GET /pets na API
    api.get('/pets').then((response) => {
      // guarda a lista recebida; o React renderiza de novo com os dados
      setPets(response.data.pets)
    })
  }, [])

  return (
    <section>
      {/* cabeçalho da página */}
      <div className={styles.pet_home_header}>
        <h1>Adote um Pet</h1>
        <p>Veja os detalhes de cada um e conheça o tutor deles</p>
      </div>
      <div className={styles.pet_container}>
        {/* só renderiza a lista se houver pets; map cria um card para cada pet */}
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              {/* a primeira imagem do pet vira o fundo do card */}
              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                }}
                className={styles.pet_card_image}
              ></div>
              <h3>{pet.name}</h3>
              <p>
                <span className="bold">Peso:</span> {pet.weight}kg
              </p>
              {/* disponível: link para os detalhes; senão: texto "Adotado!" */}
              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
              ) : (
                <p className={styles.adopted_text}>Adotado!</p>
              )}
            </div>
          ))}
        {/* mensagem quando não há pets */}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  )
}

// exporta o componente
export default Home
