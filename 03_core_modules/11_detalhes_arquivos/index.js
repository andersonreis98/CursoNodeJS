const fs = require("fs");

fs.stat("arquivo.txt", (err, stats) => {
  if (err) {
	console.error("Erro ao obter detalhes do arquivo:", err);
	return;
  }
  console.log("Detalhes do arquivo:", stats.isFile());
  console.log("Detalhes do arquivo:", stats.isDirectory());
  console.log("Detalhes do arquivo:", stats.isSymbolicLink());
  console.log("Detalhes do arquivo:", stats.ctime);
  console.log("Detalhes do arquivo:", stats.size);
});