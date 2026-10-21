// lodash: biblioteca de funções utilitárias
const _ = require('lodash');
// array ordenado com valores repetidos
const a = [1, 2, 2, 3, 3, 4, 4, 5];

// sortedUniq remove os repetidos de um array JÁ ordenado: [1, 2, 3, 4, 5]
console.log(_.sortedUniq(a))

