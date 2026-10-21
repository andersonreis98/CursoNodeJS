// módulo nativo para caminhos
const path = require('path');

// caminho de exemplo (não usado abaixo)
const pathExemplo = 'pasta/arquivo.txt';

// resolve transforma um caminho relativo em absoluto, a partir da pasta onde o node foi executado
console.log('path absoluto:', path.resolve("teste.txt"));

// nome da pasta intermediária
const midFolder = "relatorios";
// nome do arquivo
const fileName = "relatorio_2026.txt";
// join junta as partes usando o separador correto do sistema (/ no Linux, \ no Windows)
const fullPath = path.join(midFolder, fileName);
// imprime relatorios/relatorio_2026.txt
console.log('Caminho completo:', fullPath);
