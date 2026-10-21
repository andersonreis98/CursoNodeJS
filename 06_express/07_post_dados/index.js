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

// ler o body da requisição
// transforma os dados enviados por formulário em objeto (req.body)
app.use(
	express.urlencoded({
		extended: true,
	})
);

// transforma corpos em JSON em objeto (req.body)
app.use(express.json());

// rota que mostra o formulário de cadastro
// precisa vir ANTES de "/users/:id", senão "add" seria tratado como um id
app.get('/users/add', (req, res) => {
	res.sendFile(`${basePath}/userForm.html`);
});

// rota POST que recebe os dados enviados pelo formulário
app.post('/users/save', (req, res) => {
	// mostra todos os dados recebidos
	console.log(req.body);
	// cada campo chega com o "name" do input do formulário
	const name = req.body.name;
	const age = req.body.age;

	console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`);

	// mostra o formulário novamente
	res.sendFile(`${basePath}/userForm.html`);
});

// req o que recebe e res o que envia
// rota com parâmetro dinâmico
app.get('/users/:id', (req, res) => {
	const id = req.params.id;

	console.log(`Estamos buscando pelo úsuario: ${id}`);

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

