const path = require('path');

const pathExemplo = 'pasta/arquivo.txt';

const nomeArquivo = path.basename(pathExemplo);
console.log('Nome do arquivo:', nomeArquivo);

const diretorio = path.dirname(pathExemplo);
console.log('Diretório:', diretorio);

const extensao = path.extname(pathExemplo);
console.log('Extensão do arquivo:', extensao); 