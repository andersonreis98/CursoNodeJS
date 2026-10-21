// módulo nativo HTTP
const http = require('http');
// módulo nativo de arquivos
const fs = require('fs');
// porta do servidor
const port = 3000;

// cria o servidor
const server = http.createServer((req, res) => {
	// separa a URL e transforma a query string em objeto
	const urlInfo = require('url').parse(req.url, true);
	// valor enviado pelo formulário (?name=...)
	const name = urlInfo.query.name;

	// se ainda não há nome, mostra o formulário
	if (!name) {
		// lê o index.html e envia ao navegador
		fs.readFile('index.html', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data);
			return res.end();
		});
	} else {
		// writeFile cria o arquivo (ou substitui o conteúdo, se já existir) com o nome digitado
		fs.writeFile("arquivo.txt", name, function(err, data) {
			// status 302 = redirecionamento; "location" diz para onde ir
			res.writeHead(302, {
				location: "/",
			});
			// finaliza a resposta, e o navegador volta para a página inicial
			return res.end();
		});
	}
});

// inicia o servidor
server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

