// módulo de caminhos (importado, mas não usado aqui)
const path = require('path');
// módulo de arquivos
const fs = require('fs');

// existsSync verifica se a pasta existe
if (!fs.existsSync('./pasta')) {
	console.log('pasta não existe');
	// mkdirSync cria a pasta de forma síncrona
	fs.mkdirSync('pasta');
// se já existe, apenas avisa
} else if (fs.existsSync('./pasta')) {
	console.log('Existe');
}

