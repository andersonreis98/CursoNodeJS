// bcrypt: gera o hash da senha e compara senhas
const bcrypt = require('bcrypt')
// jsonwebtoken: valida e lê tokens JWT
const jwt = require('jsonwebtoken')

// importa o model User
const User = require('../models/User')

// helpers (funções auxiliares)
// busca o usuário a partir do token
const getUserByToken = require('../helpers/get-user-by-token')
// extrai o token do cabeçalho Authorization
const getToken = require('../helpers/get-token')
// cria o token e envia a resposta de autenticação
const createUserToken = require('../helpers/create-user-token')
// upload de imagens (importado, mas não usado aqui: o upload é feito nas rotas)
const { imageUpload } = require('../helpers/image-upload')

// controller com a lógica das rotas de usuário
module.exports = class UserController {
  // POST /users/register -> cadastra um usuário
  static async register(req, res) {
    // dados enviados pelo front-end (JSON)
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    // validações
    // cada campo obrigatório que faltar gera resposta 422 (dados inválidos) e encerra
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
      return
    }

    // as senhas precisam ser iguais
    if (password != confirmpassword) {
      res
        .status(422)
        .json({ message: 'A senha e a confirmação precisam ser iguais!' })
      return
    }

    // verifica se o usuário já existe
    // busca um usuário com o mesmo e-mail
    const userExists = await User.findOne({ email: email })

    // e-mail já cadastrado
    if (userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // cria a senha
    // salt aleatório com custo 12 (quanto maior, mais lento e seguro)
    const salt = await bcrypt.genSalt(12)
    // gera o hash da senha
    const passwordHash = await bcrypt.hash(password, salt)

    // cria o usuário
    // novo documento (ainda não salvo), com a senha em hash
    const user = new User({
      name: name,
      email: email,
      phone: phone,
      password: passwordHash,
    })

    // tenta salvar
    try {
      // salva no banco e recebe o documento criado (com _id)
      const newUser = await user.save()

      // gera o token e responde ao front-end (o usuário já fica logado)
      await createUserToken(newUser, req, res)
    // erro ao salvar
    } catch (error) {
      // 500 = erro interno do servidor
      res.status(500).json({ message: error })
    }
  }

  // POST /users/login -> faz login
  static async login(req, res) {
    // dados enviados
    const email = req.body.email
    const password = req.body.password

    // validações de campos obrigatórios
    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatória!' })
      return
    }

    // verifica se o usuário existe
    const user = await User.findOne({ email: email })

    // não encontrou ninguém com esse e-mail
    if (!user) {
      return res
        .status(422)
        .json({ message: 'Não há usuário cadastrado com este e-mail!' })
    }

    // verifica se a senha confere
    // compare compara a senha digitada com o hash salvo
    const checkPassword = await bcrypt.compare(password, user.password)

    // senha errada
    if (!checkPassword) {
      return res.status(422).json({ message: 'Senha inválida' })
    }

    // tudo certo: gera o token e responde
    await createUserToken(user, req, res)
  }

  // GET /users/checkuser -> devolve o usuário dono do token (usado pelo front ao abrir a página)
  static async checkUser(req, res) {
    // usuário atual (começa indefinido)
    let currentUser

    // mostra o cabeçalho Authorization no terminal
    console.log(req.headers.authorization)

    // se veio o cabeçalho com o token
    if (req.headers.authorization) {
      // extrai o token
      const token = getToken(req)
      // valida e decodifica (se o token for inválido, lança erro e a requisição falha)
      const decoded = jwt.verify(token, 'nossosecret')

      // busca o usuário pelo id guardado no token
      currentUser = await User.findById(decoded.id)

      // remove a senha antes de enviar a resposta
      currentUser.password = undefined
    } else {
      // sem token: ninguém logado
      currentUser = null
    }

    // envia o usuário (ou null)
    res.status(200).send(currentUser)
  }

  // GET /users/:id -> busca um usuário pelo id
  static async getUserById(req, res) {
    // id vindo da URL
    const id = req.params.id

    // busca no banco (atenção: um id em formato inválido gera erro de cast não tratado)
    const user = await User.findById(id)

    // não encontrado
    if (!user) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }

    // encontrado (atenção: o objeto inclui o hash da senha)
    res.status(200).json({ user })
  }

  // PATCH /users/edit/:id -> edita o perfil do usuário logado
  static async editUser(req, res) {
    // pega o token do cabeçalho
    const token = getToken(req)

    //console.log(token);

    // usuário dono do token (o id da URL não é usado: só edita a si mesmo)
    const user = await getUserByToken(token)

    // console.log(user);
    // console.log(req.body)
    // console.log(req.file.filename)

    // dados enviados (multipart/form-data, por causa da imagem)
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    // nome do arquivo da nova foto (se enviada)
    let image = ''

    // req.file existe quando o multer recebeu uma imagem
    if (req.file) {
      image = req.file.filename
    }

    // validações
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    // atualiza o nome no objeto
    user.name = name

    if (!email) {
      res.status(422).json({ message: 'O e-mail é obrigatório!' })
      return
    }

    // verifica se o usuário existe
    // procura alguém com o novo e-mail
    const userExists = await User.findOne({ email: email })

    // se trocou o e-mail para um que já pertence a outra pessoa, bloqueia
    if (user.email !== email && userExists) {
      res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
      return
    }

    // atualiza o e-mail
    user.email = email

    // se enviou imagem, atualiza o nome do arquivo
    if (image) {
      const imageName = req.file.filename
      user.image = imageName
    }

    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatório!' })
      return
    }

    // atualiza o telefone
    user.phone = phone

    // verifica se as senhas conferem
    if (password != confirmpassword) {
      // atenção: falta "return" aqui; o código continua e tenta responder de novo mais abaixo
      res.status(422).json({ error: 'As senhas não conferem.' })

      // troca a senha
    // senhas iguais e preenchidas: gera um novo hash
    } else if (password == confirmpassword && password != null) {
      // criando a senha
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      // hash da nova senha
      const passwordHash = await bcrypt.hash(reqPassword, salt)

      // atualiza a senha
      user.password = passwordHash
    }

    // tenta salvar
    try {
      // retorna os dados atualizados
      const updatedUser = await User.findOneAndUpdate(
        // filtro: o próprio usuário
        { _id: user._id },
        // $set aplica os campos alterados
        { $set: user },
        // new: true faz retornar o documento já atualizado
        { new: true },
      )
      // responde com sucesso
      res.json({
        message: 'Usuário atualizado com sucesso!',
        data: updatedUser,
      })
    // erro ao atualizar
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }
}
