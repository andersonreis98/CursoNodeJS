// módulo de sistema de arquivos
const fs = require("fs");

// impresso primeiro
console.log("Início");

// writeFile é assíncrono: o Node não espera terminar e segue para a próxima linha
fs.writeFile("arquivo.txt", "Oi", function (err) {
  // setTimeout espera 1000 ms (1 segundo) antes de executar a função
  setTimeout(function () {
    // impresso por último, depois de "Fim"
    console.log("Arquivo criado!");
  }, 1000);
});

// impresso antes de "Arquivo criado!", porque o código acima é assíncrono
console.log("Fim");

