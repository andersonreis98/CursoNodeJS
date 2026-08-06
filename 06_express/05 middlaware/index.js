const express = require('express');
const app = express();
const port = 3001;

const path = require('path');

const basePath = path.join(__dirname, 'templates');

const checkAuth = function(req, res, next) {

	console.log('Fazendo autenticação...');

	if (req.query.auth === 'true') {
		console.log('Autenticado com sucesso!');
		next();
	} else {
		console.log('Não autenticado!');
		res.send('Você precisa fazer login para acessar essa página!');
	}

};

app.use(checkAuth);

// req o que recebe e res o que envia
app.get('/users/:id', (req, res) => {

	const id = req.params.id;

	console.log(`Estamos buscando pelo úsuario: ${id}`);

	res.sendFile(`${basePath}/users.html`);

});

app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
	console.log('Servidor rodando na porta 3001');
});