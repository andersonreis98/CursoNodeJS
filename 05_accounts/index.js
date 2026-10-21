// módulos externos
// inquirer: faz perguntas e mostra menus no terminal
const inquirer = require('inquirer')
// chalk: colore as mensagens do terminal
const chalk = require('chalk')

// módulo interno (core module) para ler e escrever arquivos
const fs = require('fs')

// inicia o programa mostrando o menu principal
operacao()

// mostra o menu principal e direciona para a ação escolhida
function operacao() {
  inquirer
    .prompt([
      {
        // type 'list' mostra opções para escolher com as setas do teclado
        type: 'list',
        // a resposta ficará em resposta.action
        name: 'action',
        message: 'O que você deseja fazer?',
        // opções do menu
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Sair',
        ],
      },
    ])
    // executa quando o usuário escolhe uma opção
    .then((resposta) => {
      // opção escolhida
      const action = resposta['action']

      // chama a função correspondente a cada opção
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
        // encerra o programa
        process.exit()
      }
    })
}

// criar conta
// mostra as boas-vindas e chama a criação da conta
function criarConta() {
  console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))

  gerarConta()
}

// pergunta o nome da conta e cria o arquivo JSON dela
function gerarConta() {
  inquirer
    .prompt([
      {
        name: 'nomeConta',
        message: 'Digite um nome para a sua conta:',
      },
    ])
    .then((resposta) => {
      // mostra o nome digitado
      console.info(resposta['nomeConta'])

      // guarda o nome digitado
      const nomeConta = resposta['nomeConta']

      // cria a pasta "accounts" se ela ainda não existir
      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      // cada conta é um arquivo accounts/<nome>.json; se já existe, o nome está em uso
      if (fs.existsSync(`accounts/${nomeConta}.json`)) {
        console.log(
          chalk.bgRed.black('Esta conta já existe, escolha outro nome!'),
        )
        // pergunta de novo (atenção: falta um "return" aqui, então o código abaixo
        // continua e sobrescreve a conta existente com saldo 0)
        gerarConta(nomeConta)
      }

      // cria o arquivo da conta com saldo inicial 0
      // writeFileSync é síncrono e não usa callback: a função abaixo nunca é chamada
      fs.writeFileSync(
        `accounts/${nomeConta}.json`,
        '{"saldo":0}',
        function (err) {
          console.log(err)
        },
      )

      console.log(chalk.green('Parabéns, sua conta foi criada!'))
      // volta ao menu principal
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

      // se a conta não existe, pergunta de novo
      if (!checarConta(nomeConta)) {
        return depositar()
      }

      // pergunta o valor do depósito
      inquirer
        .prompt([
          {
            name: 'quantia',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((resposta) => {
          const quantia = resposta['quantia']

          // soma o valor ao saldo
          addValor(nomeConta, quantia)
          // volta ao menu
          operacao()
        })
    })
}

// verifica se o arquivo da conta existe; retorna true ou false
function checarConta(nomeConta) {
  if (!fs.existsSync(`accounts/${nomeConta}.json`)) {
    console.log(chalk.bgRed.black('Esta conta não existe, escolha outro nome!'))
    return false
  }
  return true
}

// lê o arquivo da conta e retorna os dados como objeto JavaScript
function getConta(nomeConta) {
  // lê o arquivo como texto (utf8); flag 'r' = somente leitura
  const accountJSON = fs.readFileSync(`accounts/${nomeConta}.json`, {
    encoding: 'utf8',
    flag: 'r',
  })

  // converte o texto JSON em objeto, ex.: { saldo: 0 }
  return JSON.parse(accountJSON)
}

// soma a quantia ao saldo e salva no arquivo
function addValor(nomeConta, quantia) {
  // dados atuais da conta
  const dadosConta = getConta(nomeConta)

  // se nenhum valor foi digitado, mostra erro e pergunta de novo
  if (!quantia) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return depositar()
  }

  // parseFloat converte texto em número decimal antes de somar
  dadosConta.saldo = parseFloat(quantia) + parseFloat(dadosConta.saldo)

  // JSON.stringify converte o objeto de volta para texto e salva no arquivo
  fs.writeFileSync(
    `accounts/${nomeConta}.json`,
    JSON.stringify(dadosConta),
    function (err) {
      console.log(err)
    },
  )

  // confirma o depósito
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

      // se a conta não existe, pergunta de novo
      if (!checarConta(nomeConta)) {
        return consultarSaldo()
      }

      // lê os dados da conta
      const dadosConta = getConta(nomeConta)

      // mostra o saldo
      console.log(
        chalk.bgBlue.black(
          `Olá, o saldo da sua conta é de R$${dadosConta.saldo}`,
        ),
      )
      // volta ao menu
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

      // se a conta não existe, pergunta de novo
      if (!checarConta(nomeConta)) {
        return sacar()
      }

      // pergunta o valor do saque
      inquirer
        .prompt([
          {
            name: 'quantia',
            message: 'Quanto você deseja sacar?',
          },
        ])
        .then((resposta) => {
          const quantia = resposta['quantia']

          // tira o valor do saldo
          removeConta(nomeConta, quantia)
          // volta ao menu
          operacao()
        })
    })
}

// subtrai a quantia do saldo (o nome "removeConta" se refere a remover valor da conta)
function removeConta(nomeConta, quantia) {
  // dados atuais da conta
  const dadosConta = getConta(nomeConta)

  // sem valor digitado: erro e nova pergunta
  if (!quantia) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return sacar()
  }

  // não deixa sacar mais do que o saldo disponível
  if (dadosConta.saldo < quantia) {
    console.log(chalk.bgRed.black('Valor indisponível!'))
    return sacar()
  }

  // subtrai o saque do saldo
  dadosConta.saldo = parseFloat(dadosConta.saldo) - parseFloat(quantia)

  // salva o novo saldo no arquivo
  fs.writeFileSync(
    `accounts/${nomeConta}.json`,
    JSON.stringify(dadosConta),
    function (err) {
      console.log(err)
    },
  )

  // confirma o saque
  console.log(
    chalk.green(`Foi realizado um saque de R$${quantia} da sua conta!`),
  )
}

