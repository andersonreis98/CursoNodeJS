// importa o Express
const express = require('express');
// cria a aplicação
const app = express();
// porta do servidor
const port = 3001;

// módulo nativo para montar caminhos
const path = require('path');

// importa o roteador de usuários
const users = require('./users');

// ler o body da requisição
// lê dados de formulários e coloca em req.body
app.use(
	express.urlencoded({
		extended: true,
	})
);

//arquivos estaticos
// libera a pasta "public": /css/styles.css aponta para public/css/styles.css
app.use(express.static('public'));

// lê JSON e coloca em req.body
app.use(express.json());

// caminho absoluto da pasta templates
const basePath = path.join(__dirname, 'templates');

// rotas de usuários com prefixo /users
app.use("/users", users);

// rota da página inicial
app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

// inicia o servidor
app.listen(port, () => {
	console.log('Servidor rodando na porta 3001');
});

