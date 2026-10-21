// chalk permite colorir e estilizar textos no terminal
const chalk = require("chalk");

// nota do aluno
const nota = 8;

// se a nota for maior ou igual a 7, o aluno passou
if (nota >= 7) {
  // texto verde e em negrito
  console.log(chalk.green.bold("Parabéns, você passou!"));
} else {
  // fundo vermelho e texto preto
  console.log(chalk.bgRed.black("Você precisa fazer a prova final!"));
}

