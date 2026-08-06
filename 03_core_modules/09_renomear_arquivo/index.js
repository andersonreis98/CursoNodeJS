const fs = require('fs');

const nomeArquivo = 'arquivo_renomeado.txt';
const novoNomeArquivo = 'arquivo.txt';

fs.rename(nomeArquivo, novoNomeArquivo, function (err) {
	if (err) {
		console.error('Erro ao renomear o arquivo:', err);
		return;
	}
	console.log('Arquivo renomeado com sucesso!');
});
