// módulo de sistema de arquivos
const fs = require("fs");

// impresso primeiro
console.log("Início");

// writeFileSync é síncrono: o código PARA aqui até o arquivo ser escrito
fs.writeFileSync("arquivo.txt", "Oi");

// só é impresso depois que o arquivo foi criado
console.log("Fim");

