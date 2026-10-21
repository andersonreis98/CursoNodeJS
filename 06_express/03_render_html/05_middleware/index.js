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

// middleware: função executada ANTES das rotas; recebe req, res e next
const checkAuth = function (req, res, next) {
	// simula um usuário logado
	req.authStatus = true;

	// verifica se está autenticado
	if (req.authStatus) {
		console.log('Está logado, pode continuar');
		// next() libera a requisição para seguir até a rota
		next()
	} else {
		console.log('Não está logado, faça login para continuar');
		// aqui também segue em frente (exemplo didático; num caso real bloquearia)
		next()
	}
};

// app.use registra o middleware para TODAS as requisições
app.use(checkAuth)

// rota da página inicial
app.get('/', (req, res) => {
	// sendFile envia um arquivo do disco (precisa de caminho absoluto)
	res.sendFile(`${basePath}/index.html`);
});

// inicia o servidor
app.listen(port, () => {
	console.log('Servidor rodando na porta 3000');
});

