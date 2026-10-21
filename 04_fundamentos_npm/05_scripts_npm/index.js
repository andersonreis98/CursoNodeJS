// lodash: biblioteca de funções utilitárias
const _ = require('lodash');

// chalk: colore textos no terminal
const chalk = require('chalk');

// arrays de exemplo
const a = [1, 2, 3, 4, 5];
const b = [2, 4, 6, 7, 8];
// itens de "a" que não existem em "b": [1, 3, 5]
const diff = _.difference(a,b);

// imprime o resultado em vermelho e negrito
console.log(chalk.red.bold(diff));
