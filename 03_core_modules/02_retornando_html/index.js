// módulo nativo HTTP
const http = require('http');
// porta do servidor
const port = 3000;

// cria o servidor
const server = http.createServer((req, res) => {
	// código 200 = OK (requisição bem-sucedida)
	res.statusCode = 200;
	// avisa o navegador que o conteúdo é HTML, para ele renderizar as tags
	res.setHeader('Content-Type', 'text/html');
    // envia o HTML e encerra a resposta
    res.end("<h1>Olá, este é meu primeiro server com HTML</h1>");
});

// inicia o servidor
server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
