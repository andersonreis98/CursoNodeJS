// exemplo de execução: node index.js --nome=Anderson --idade=26
// --nome=Anderson --idade=26
// minimist é um pacote externo (instalado via npm) que transforma argumentos em objeto
const minimist = require("minimist");

// converte os argumentos em objeto, ex.: { _: [], nome: 'Anderson', idade: 26 }
const args = minimist(process.argv.slice(2));

// mostra o objeto completo
console.log(args);

// lê cada valor pela chave
const nome = args["nome"];
const idade = args["idade"];

// imprime os valores
console.log(nome);
console.log(idade);
