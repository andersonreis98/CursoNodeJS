// inquirer é um pacote externo que facilita fazer perguntas no terminal
const inquirer = require('inquirer')

inquirer
  // prompt recebe um array de perguntas; "name" é a chave onde a resposta será guardada
  .prompt([
    { name: 'p1', message: 'Qual a primeira nota?' },
    { name: 'p2', message: 'Qual a segunda nota?' },
  ])
  // prompt retorna uma Promise; o then recebe as respostas quando o usuário termina
  .then((answers) => {
    // mostra o objeto com as respostas, ex.: { p1: '7', p2: '8' }
    console.log(answers)
    // as respostas chegam como texto, por isso parseInt converte para número antes de calcular a média
    const media = (parseInt(answers.p1) + parseInt(answers.p2)) / 2

    // imprime a média calculada
    console.log(`A média do aluno é ${media}`)
  })
  // catch captura qualquer erro que aconteça durante as perguntas
  .catch((err) => {
    console.log(err)
  })

