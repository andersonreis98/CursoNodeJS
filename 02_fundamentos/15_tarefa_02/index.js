// pacote para fazer perguntas no terminal
const inquirer = require('inquirer')
// pacote para colorir textos no terminal
const chalk = require('chalk')

inquirer
  // perguntas: as respostas ficam em answers.nome e answers.idade
  .prompt([
    { name: 'nome', message: 'Qual o seu nome?' },
    { name: 'idade', message: 'Qual a sua idade?' },
  ])
  // executa quando o usuário responde tudo
  .then((answers) => {
    // monta a frase com as respostas
    const response = `O nome do usuário é ${answers.nome} e ele tem ${answers.idade} anos`
    // imprime com fundo amarelo e texto preto
    console.log(chalk.bgYellow.black(response))
  })
  // trata possíveis erros
  .catch((err) => {
    console.log(err)
  })

