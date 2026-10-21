// módulo nativo para manipular caminhos de arquivos
const path = require('path');

// caminho de exemplo
const pathExemplo = 'pasta/arquivo.txt';

// basename retorna só o nome do arquivo: arquivo.txt
const nomeArquivo = path.basename(pathExemplo);
console.log('Nome do arquivo:', nomeArquivo);

// dirname retorna a pasta onde o arquivo está: pasta
const diretorio = path.dirname(pathExemplo);
console.log('Diretório:', diretorio);

// extname retorna a extensão: .txt
const extensao = path.extname(pathExemplo);
console.log('Extensão do arquivo:', extensao); 
