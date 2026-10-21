// importa o Express
const express = require('express');
// cria a aplicação
const app = express();
// porta do servidor
const port = 3001;

// módulo nativo para montar caminhos
const path = require('path');

// caminho absoluto da pasta templates
const basePath = path.join(__dirname, 'templates');

// req o que recebe e res o que envia
// ":id" é um parâmetro dinâmico: /users/1, /users/abc etc.
app.get('/users/:id', (req, res) => {

	// lê o valor do parâmetro da URL
	const id = req.params.id;

	console.log(`Estamos buscando pelo úsuario: ${id}`);

	// envia a página de usuário
	res.sendFile(`${basePath}/users.html`);

});

// rota da página inicial
app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

// inicia o servidor
app.listen(port, () => {
	console.log('Servidor rodando na porta 3001');
});
