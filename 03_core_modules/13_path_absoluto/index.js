const path = require('path');

const pathExemplo = 'pasta/arquivo.txt';

console.log('path absoluto:', path.resolve("teste.txt"));

const midFolder = "relatorios";
const fileName = "relatorio_2026.txt";
const fullPath = path.join(midFolder, fileName);
console.log('Caminho completo:', fullPath);