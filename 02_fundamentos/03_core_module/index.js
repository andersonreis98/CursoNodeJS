// "path" é um core module (vem junto com o Node, não precisa instalar)
const path = require('path')
// extname retorna a extensão de um nome de arquivo
const extension = path.extname('arquivo.php')
// imprime ".php"
console.log(extension)
