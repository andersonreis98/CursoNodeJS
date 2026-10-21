// Link navega entre páginas sem recarregar (substitui o <a>)
import { Link } from 'react-router-dom'
// useContext lê os dados de um contexto
import React, { useContext } from 'react'

// estilos da navbar (CSS Module)
import styles from './Navbar.module.css'

// importa a imagem; o React gera o caminho final dela
import Logo from '../../assets/img/logo.png'

/* contextos */
// contexto do usuário (authenticated, logout...)
import { Context } from '../../context/UserContext'

/* hooks */

// componente da barra de navegação
function Navbar() {
  // pega do contexto se está logado e a função de logout
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className={styles.navbar}>
      {/* logo e nome do site */}
      <div className={styles.navbar_logo}>
        <img src={Logo} alt="Get A Pet" />
        <h2>Get A Pet</h2>
      </div>
      <ul>
        {/* link sempre visível */}
        <li>
          <Link to="/">Adotar</Link>
        </li>
        {/* operador ternário: mostra um grupo de links se estiver logado, outro se não */}
        {authenticated ? (
          // <></> é um Fragment: agrupa elementos sem criar uma div extra
          <>
            <li>
              <Link to="/pet/myadoptions">Minhas Adoções</Link>
            </li>
            <li>
              <Link to="/pet/mypets">Meus Pets</Link>
            </li>
            <li>
              <Link to="/user/profile">Meu Perfil</Link>
            </li>
            {/* ao clicar, chama a função logout do contexto */}
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          // links para quem não está logado
          <>
            <li>
              <Link to="/login">Entrar</Link>
            </li>
            <li>
              <Link to="/register">Registar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

// exporta o componente
export default Navbar
