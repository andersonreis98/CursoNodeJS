// importa o React
import React from 'react';
// ReactDOM coloca os componentes React dentro do HTML da página
import ReactDOM from 'react-dom';
// CSS global da aplicação
import './index.css';
// componente principal
import App from './App';

// renderiza o App dentro da <div id="root"> do public/index.html (sintaxe do React 17)
ReactDOM.render(
  // StrictMode ativa avisos extras durante o desenvolvimento
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // elemento do HTML onde o React vai desenhar a aplicação
  document.getElementById('root')
);
