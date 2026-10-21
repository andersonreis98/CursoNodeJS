// módulo nativo de arquivos
const fs = require("fs");

// stat obtém informações (metadados) sobre o arquivo
fs.stat("arquivo.txt", (err, stats) => {
  // se o arquivo não existir, mostra o erro e para
  if (err) {
	console.error("Erro ao obter detalhes do arquivo:", err);
	return;
  }
  // true se for um arquivo comum
  console.log("Detalhes do arquivo:", stats.isFile());
  // true se for uma pasta
  console.log("Detalhes do arquivo:", stats.isDirectory());
  // true se for um link simbólico (atalho)
  console.log("Detalhes do arquivo:", stats.isSymbolicLink());
  // data da última alteração dos metadados
  console.log("Detalhes do arquivo:", stats.ctime);
  // tamanho em bytes
  console.log("Detalhes do arquivo:", stats.size);
});
