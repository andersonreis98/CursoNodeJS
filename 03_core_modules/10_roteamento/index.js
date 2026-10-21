// módulo nativo HTTP
const http = require('http');
// módulo nativo de arquivos
const fs = require('fs');
// módulo nativo de URLs
const url = require('url');
// porta do servidor
const port = 3000;

// cria o servidor
const server = http.createServer((req, res) => {
	// separa a URL da requisição
	const q = url.parse(req.url, true);
	// monta o caminho do arquivo: "/contato.html" vira "./contato.html"
	const filename = '.' + q.pathname;

	// só tenta servir arquivos HTML
	if (filename.includes('html')) {
		// verifica se o arquivo existe na pasta
		// atenção: se não existir, nenhuma resposta é enviada e o navegador fica carregando
		if (fs.existsSync(filename)) {
			// lê o arquivo e envia como HTML
			fs.readFile(filename, (err, data) => {
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.write(data);
				return res.end();
			});
		}
	} else {
		// qualquer outro caminho: página 404 (não encontrada)
		res.writeHead(404, { 'Content-Type': 'text/html' });
		res.write('<h1>404 - Pagina nao encontrada</h1>');
		return res.end();
	}
});

// inicia o servidor
server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

