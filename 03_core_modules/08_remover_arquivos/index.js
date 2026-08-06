const fs = require('fs');

fs.unlink('arquivo.txt', err => {
	if (err) {
		console.error('Erro ao remover o arquivo:', err);
		return;
	}
	console.log('Arquivo removido com sucesso!');
});
