// importa o model User
const User = require('../models/User')

// bcryptjs: gera o hash da senha e compara senhas com o hash salvo
const bcrypt = require('bcryptjs')

// controller de autenticação (o nome da classe é UserController, mas o arquivo é AuthController)
module.exports = class UserController {
  // mostra a tela de login
  static login(req, res) {
    res.render('auth/login')
  }

  // processa o formulário de login
  static async loginPost(req, res) {
    // pega email e senha digitados
    const { email, password } = req.body

    // procura o usuário
    // busca no banco um usuário com esse e-mail
    const user = await User.findOne({ where: { email: email } })

    // se não encontrou, mostra a tela de login com mensagem de erro
    if (!user) {
      res.render('auth/login', {
        message: 'Usuário não encontrado!',
      })

      // interrompe para não continuar o login
      return
    }

    // compara a senha
    // compareSync compara a senha digitada com o hash salvo no banco
    const passwordMatch = bcrypt.compareSync(password, user.password)

    // senha errada: mostra mensagem de erro
    if (!passwordMatch) {
      res.render('auth/login', {
        message: 'Senha inválida!',
      })

      return
    }

    // autentica o usuário
    // salvar o id na sessão é o que "loga" o usuário
    req.session.userid = user.id

    // mensagem que aparecerá na próxima página
    req.flash('message', 'Login realizado com sucesso!')

    // salva a sessão antes de redirecionar, garantindo que o login foi gravado
    req.session.save(() => {
      res.redirect('/')
    })
  }

  // mostra a tela de cadastro
  static register(req, res) {
    res.render('auth/register')
  }

  // processa o formulário de cadastro
  static async registerPost(req, res) {
    // dados digitados no formulário
    const { name, email, password, confirmpassword } = req.body

    // validação: as senhas precisam ser iguais
    if (password != confirmpassword) {
      // mensagem de erro
      req.flash('message', 'As senhas não conferem, tente novamente!')
      // mostra o formulário de novo
      res.render('auth/register')

      return
    }

    // validação do e-mail
    // verifica se já existe usuário com esse e-mail
    const checkIfUserExists = await User.findOne({ where: { email: email } })

    // e-mail já cadastrado: mostra erro
    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso!')
      res.render('auth/register')

      return
    }

    // salt: valor aleatório que torna o hash único (10 = custo do processamento)
    const salt = bcrypt.genSaltSync(10)
    // gera o hash da senha; é ele que vai para o banco
    const hashedPassword = bcrypt.hashSync(password, salt)

    // objeto do novo usuário
    const user = {
      name,
      email,
      // salva o hash, nunca a senha pura
      password: hashedPassword,
    }

    // insere no banco
    User.create(user)
      // user aqui é o registro criado, já com o id
      .then((user) => {
        // inicia a sessão
        // loga o usuário logo após o cadastro
        req.session.userid = user.id

        // console.log('salvou dado')
        // console.log(req.session.userid)

        // linha repetida (o id já foi salvo acima)
        req.session.userid = user.id

        // mensagem de sucesso
        req.flash('message', 'Cadastro realizado com sucesso!')

        // salva a sessão e redireciona para a página inicial
        req.session.save(() => {
          res.redirect('/')
        })
      })
      // se der erro, mostra no terminal
      .catch((err) => console.log(err))
  }

  // encerra a sessão
  static logout(req, res) {
    // destroy apaga a sessão: o usuário deixa de estar logado
    req.session.destroy()
    // volta para a tela de login
    res.redirect('/login')
  }
}
