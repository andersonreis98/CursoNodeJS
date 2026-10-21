// módulo nativo de arquivos
const fs = require('fs');

// nome atual do arquivo
const nomeArquivo = 'arquivo_renomeado.txt';
// novo nome que o arquivo vai receber
const novoNomeArquivo = 'arquivo.txt';

// rename muda o nome (ou o local) de um arquivo
fs.rename(nomeArquivo, novoNomeArquivo, function (err) {
	// trata erro, por exemplo se o arquivo original não existir
	if (err) {
		console.error('Erro ao renomear o arquivo:', err);
		return;
	}
	// sucesso
	console.log('Arquivo renomeado com sucesso!');
});

