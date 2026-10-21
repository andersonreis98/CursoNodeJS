// exemplo de execução: node index.js --a=10 --b=20
// --a=10 --b=20

// externo
// módulo externo instalado pelo npm
const minimist = require("minimist");

// interno
// módulo criado no próprio projeto
const meuModulo = require("./meu_modulo");
// pega a função soma do módulo
const soma = meuModulo.soma;

// transforma os argumentos em objeto
const args = minimist(process.argv.slice(2));

// lê os valores de --a e --b
const a = args["a"];
const b = args["b"];

// chama a função que imprime a soma
soma(a, b);

