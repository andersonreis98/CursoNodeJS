// lodash é uma biblioteca de funções utilitárias; por convenção é importada como "_"
const _ = require('lodash');

// primeiro array
const a = [1, 2, 3, 4, 5];
// segundo array
const b = [2, 4, 6, 7, 8];
// difference retorna os itens de "a" que NÃO estão em "b": [1, 3, 5]
const diff = _.difference(a,b)

// imprime o resultado
console.log(diff)
