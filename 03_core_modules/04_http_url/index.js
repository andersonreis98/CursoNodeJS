// módulo nativo HTTP
const http = require('http');
// porta do servidor
const port = 3000;

// cria o servidor
const server = http.createServer((req, res) => {

	// url.parse (forma antiga) separa a URL; o "true" transforma a query string em objeto
	const urlInfo = require('url').parse(req.url, true);
	// lê o parâmetro ?name= da URL
	const name = urlInfo.query.name;
	// status 200 = OK
	res.statusCode = 200;
	// a resposta é HTML
	res.setHeader('Content-Type', 'text/html');
	// se o nome não foi enviado, mostra o formulário
	if (!name) {
		// formulário GET: ao enviar, o navegador coloca ?name=valor na URL
		res.end(`
			<h1>Preencha o seu nome:</h1>
			<form method="GET">
				<input type="text" name="name"/>
				<input type="submit" value="Enviar"/>
			</form>`);
	} else {
		// se o nome veio, mostra a mensagem de boas-vindas
		res.end(`<h1>Seja bem-vindo ${name}!</h1>`);
	}
});

// inicia o servidor
server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});
