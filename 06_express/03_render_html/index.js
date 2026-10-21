// importa o Express
const express = require('express');
// cria a aplicação
const app = express();
// porta do servidor
const port = 3000;

// módulo nativo para montar caminhos de pastas
const path = require('path');

// caminho absoluto da pasta templates (__dirname = pasta deste arquivo)
const basePath = path.join(__dirname, 'templates');

// req o que recebe e res o que envia
// rota da página inicial
app.get('/', (req, res) => {
	// envia o arquivo HTML como resposta
	res.sendFile(`${basePath}/index.html`);
});

// inicia o servidor
app.listen(port, () => {
	console.log('Servidor rodando na porta 3000');
});

