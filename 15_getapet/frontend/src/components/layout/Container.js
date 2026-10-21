// CSS Modules: as classes do arquivo viram propriedades do objeto "styles" (nomes únicos, sem conflito)
import styles from "./Container.module.css";

// componente que envolve o conteúdo das páginas; "children" é o que vem entre <Container> e </Container>
function Container({children}) {
  // <main> com a classe "container" do CSS Module
  return <main className={styles.container}>
      {children}
  </main>
}

// exporta o componente
export default Container
