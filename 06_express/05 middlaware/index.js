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

// middleware de autenticação: roda antes de todas as rotas
const checkAuth = function(req, res, next) {

	console.log('Fazendo autenticação...');

	// lê o parâmetro da URL, ex.: http://localhost:3001/?auth=true
	if (req.query.auth === 'true') {
		console.log('Autenticado com sucesso!');
		// libera a requisição para a rota
		next();
	} else {
		console.log('Não autenticado!');
		// responde aqui mesmo e NÃO chama next(), bloqueando o acesso à rota
		res.send('Você precisa fazer login para acessar essa página!');
	}

};

// aplica o middleware em todas as rotas
app.use(checkAuth);

// req o que recebe e res o que envia
// rota com parâmetro dinâmico ":id", ex.: /users/5
app.get('/users/:id', (req, res) => {

	// req.params guarda os parâmetros da URL
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
