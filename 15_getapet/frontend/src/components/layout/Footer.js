// estilos do rodapé (CSS Module)
import styles from "./Footer.module.css";

// componente do rodapé
function Footer() {
  // em JSX usa-se className em vez de class
  return <footer className={styles.footer}>
    {/* &copy; vira o símbolo © */}
    <p><b>Get A Pet</b> &copy; 2021</p>
  </footer>
}

// exporta o componente
export default Footer
