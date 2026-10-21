// módulo nativo de arquivos
const fs = require('fs');

// unlink apaga o arquivo informado
fs.unlink('arquivo.txt', err => {
	// se der erro (ex.: o arquivo não existe), mostra e para
	if (err) {
		console.error('Erro ao remover o arquivo:', err);
		return;
	}
	// executado somente se a remoção deu certo
	console.log('Arquivo removido com sucesso!');
});

