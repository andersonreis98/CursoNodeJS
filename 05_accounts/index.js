const inquirer = require('inquirer')
const chalk = require('chalk')

const fs = require('fs')

operacao()

function operacao() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    .then((resposta) => {
      const action = resposta['action']

      if (action === 'Criar conta') {
        criarConta()
      } else if (action === 'Depositar') {
        depositar()
      } else if (action === 'Consultar Saldo') {
        consultarSaldo()
      } else if (action === 'Sacar') {
        sacar()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
      }
    })
}

// criar conta
function criarConta() {
  console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))

  gerarConta()
}

function gerarConta() {
  inquirer
    .prompt([
      {
        name: 'nomeConta',
        message: 'Digite um nome para a sua conta:',
      },
    ])
    .then((resposta) => {
      console.info(resposta['nomeConta'])

      const nomeConta = resposta['nomeConta']

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${nomeConta}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
        )
        gerarConta(nomeConta)
      }

      fs.writeFileSync(
        `accounts/${nomeConta}.json`,
        '{"saldo":0}',
        function (err) {
          console.log(err)
        },
      )

      console.log(chalk.green('Parabéns, sua conta foi criada!'))
      operacao()
    })
}

// adiciona saldo na conta
function depositar() {
  inquirer
    .prompt([
      {
        name: 'nomeConta',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((resposta) => {
      const nomeConta = resposta['nomeConta']

      if (!checarConta(nomeConta)) {
        return depositar()
      }

      inquirer
        .prompt([
          {
            name: 'quantia',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((resposta) => {
          const quantia = resposta['quantia']

          addValor(nomeConta, quantia)
          operacao()
        })
    })
}

function checarConta(nomeConta) {
  if (!fs.existsSync(`accounts/${nomeConta}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
    return false
  }
  return true
}

function getConta(nomeConta) {
  const accountJSON = fs.readFileSync(`accounts/${nomeConta}.json`, {
    encoding: 'utf8',
    flag: 'r',
  })

  return JSON.parse(accountJSON)
}

function addValor(nomeConta, quantia) {
  const dadosConta = getConta(nomeConta)

  if (!quantia) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return depositar()
  }

  dadosConta.saldo = parseFloat(quantia) + parseFloat(dadosConta.saldo)

  fs.writeFileSync(
    `accounts/${nomeConta}.json`,
    JSON.stringify(dadosConta),
    function (err) {
      console.log(err)
    },
  )

  console.log(
    chalk.green(`Foi depositado o valor de R$${quantia} na sua conta!`),
  )
}

// retorna saldo da conta
function consultarSaldo() {
  inquirer
    .prompt([
      {
        name: 'nomeConta',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((resposta) => {
      const nomeConta = resposta['nomeConta']

      if (!checarConta(nomeConta)) {
        return consultarSaldo()
      }

      const dadosConta = getConta(nomeConta)

      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${dadosConta.saldo}`,
        ),
      )
      operacao()
    })
}

// sacar dinheiro da conta
function sacar() {
  inquirer
    .prompt([
      {
        name: 'nomeConta',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((resposta) => {
      const nomeConta = resposta['nomeConta']

      if (!checarConta(nomeConta)) {
        return sacar()
      }

      inquirer
        .prompt([
          {
            name: 'quantia',
            message: 'Quanto você deseja sacar?',
          },
        ])
        .then((resposta) => {
          const quantia = resposta['quantia']

          removeConta(nomeConta, quantia)
          operacao()
        })
    })
}

function removeConta(nomeConta, quantia) {
  const dadosConta = getConta(nomeConta)

  if (!quantia) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return sacar()
  }

  if (dadosConta.saldo < quantia) {
    console.log(chalk.bgRed.black('Valor indisponível!'))
    return sacar()
  }

  dadosConta.saldo = parseFloat(dadosConta.saldo) - parseFloat(quantia)

  fs.writeFileSync(
    `accounts/${nomeConta}.json`,
    JSON.stringify(dadosConta),
    function (err) {
      console.log(err)
    },
  )

  console.log(
    chalk.green(`Foi realizado um saque de R$${quantia} da sua conta!`),
  )
}
