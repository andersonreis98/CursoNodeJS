<template>
  <!-- bloco que agrupa elementos -->
  <div>
    <!-- componente da barra de navegação -->
    <Navbar />
    <!-- componente de mensagem; recebe o texto e a classe por props -->
    <Message />
    <!-- onde o Vue Router mostra a página da rota atual; router-view: onde o Vue Router mostra o componente da rota atual -->
    <router-view class="container" />
    <!-- rodapé da página -->
    <Footer />
  </div>
</template>

<script>
// importa o componente Navbar
import Navbar from './components/Navbar';
// importa o componente Footer
import Footer from './components/Footer';
// importa o componente Message
import Message from './components/Message';

// objeto de configuração do componente (Options API do Vue)
export default {
  // nome do componente
  name: "App",
  // components: componentes filhos usados no template
  components: {
    // registra o componente Navbar para usar como <Navbar /> no template
    Navbar,
    // registra o componente Footer para usar como <Footer /> no template
    Footer,
    // registra o componente Message para usar como <Message /> no template
    Message
  }
}
</script>

<style>
  * { /* seletor universal: aplica a todos os elementos */
    margin: 0; /* espaço externo (fora da borda) */
    padding: 0; /* espaço interno (entre o conteúdo e a borda) */
    box-sizing: border-box; /* border-box: largura inclui padding e borda */
    font-family: Helvetica; /* fonte (com alternativas, caso a primeira não exista) */
    color: #444; /* cor do texto */
  }

  .container { /* estilos dos elementos com a classe "container" */
    min-height: 300px; /* altura mínima (vh = % da altura da tela) */
  }

  a { /* estilos de todas as tags <a> */
    transition: .5s; /* animação suave ao mudar propriedades */
  }

  a:hover { /* estilo quando o mouse passa por cima */
    color: #c1b696; /* cor do texto */
  }
</style>
