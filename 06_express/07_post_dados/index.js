const express = require('express');
const app = express();
const port = 3001;

const path = require('path');

const basePath = path.join(__dirname, 'templates');

// ler o body da requisição
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

app.get('/users/add', (req, res) => {
	res.sendFile(`${basePath}/userForm.html`);
});

app.post('/users/save', (req, res) => {
	console.log(req.body);
	const name = req.body.name;
	const age = req.body.age;

	console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`);

	res.sendFile(`${basePath}/userForm.html`);
});

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
