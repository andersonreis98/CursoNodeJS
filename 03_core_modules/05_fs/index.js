// módulo nativo HTTP
const http = require('http');
// módulo nativo de arquivos
const fs = require('fs');
// porta do servidor
const port = 3000;

// cria o servidor
const server = http.createServer((req, res) => {
	// lê o arquivo HTML do disco a cada requisição
	fs.readFile('mensagem.html', (err, data) => {
		// writeHead define o status e os cabeçalhos de uma vez
		res.writeHead(200, { 'Content-Type': 'text/html' });
		// envia o conteúdo do arquivo
		res.write(data);
		// finaliza a resposta
		return res.end();
	});
});

// inicia o servidor
server.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`);
});

