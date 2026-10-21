// importa o Express
const express = require('express');
// cria a aplicação
const app = express();
// porta do servidor
const port = 3001;

// módulo nativo para montar caminhos
const path = require('path');

// importa o roteador de usuários (arquivo users/index.js)
const users = require('./users');

// ler o body da requisição
// lê dados de formulários e coloca em req.body
app.use(
	express.urlencoded({
		extended: true,
	})
);

// lê JSON e coloca em req.body
app.use(express.json());

//arquivos estaticos
// tudo dentro da pasta "public" fica acessível direto pela URL (CSS, imagens, JS)
app.use(express.static('public'));

// caminho absoluto da pasta templates
const basePath = path.join(__dirname, 'templates');

// todas as rotas do roteador "users" ganham o prefixo /users
app.use("/users", users);

// rota da página inicial
app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

// inicia o servidor
app.listen(port, () => {
	console.log('Servidor rodando na porta 3001');
});

