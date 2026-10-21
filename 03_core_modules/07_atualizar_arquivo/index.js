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
	// nome enviado pelo formulário
	const name = urlInfo.query.name;

	// sem nome: mostra o formulário
	if (!name) {
		fs.readFile('index.html', (err, data) => {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.write(data);
			return res.end();
		});
	} else {

		// adiciona uma quebra de linha para cada nome ficar em uma linha
		const nameNewLine = name + "\r\n";

		// appendFile ADICIONA ao final do arquivo, sem apagar o conteúdo anterior
		fs.appendFile("arquivo.txt", nameNewLine, function(err, data) {
			// redireciona de volta para a página inicial
			res.writeHead(302, {
				location: "/",
			});
			return res.end();
		});
	}
});

// inicia o servidor
server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

