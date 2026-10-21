// importa os models
const Pensamento = require('../models/Pensamento')
const User = require('../models/User')

// Op contém os operadores do Sequelize (like, gt, lt, or...)
const { Op } = require('sequelize')

// controller com a lógica das rotas de pensamentos
module.exports = class PensamentosController {
  // painel do usuário logado com os pensamentos dele
  static async dashboard(req, res) {
    // id do usuário logado (salvo na sessão)
    const userId = req.session.userid

    // busca o usuário e, junto, os pensamentos dele
    const user = await User.findOne({
      // filtra pelo id do usuário logado
      where: {
        id: userId,
      },
      // include traz os pensamentos relacionados (JOIN)
      include: Pensamento,
      // plain: true retorna um único objeto
      plain: true,
    })

    // dataValues contém só os dados de cada registro; map cria um array simples para a view
    const Pensamentos = user.Pensamentos.map((result) => result.dataValues)

    // flag usada na view para mostrar "nenhum pensamento"
    let emptyPensamentos = true

    // se há pensamentos, a lista não está vazia
    if (Pensamentos.length > 0) {
      emptyPensamentos = false
    }

    // mostra no terminal para depurar
    console.log(Pensamentos)
    console.log(emptyPensamentos)

    // renderiza o painel com a lista e a flag
    res.render('pensamentos/dashboard', { Pensamentos, emptyPensamentos })
  }

  // mostra o formulário de novo pensamento
  static createPensamento(req, res) {
    res.render('pensamentos/create')
  }

  // salva um novo pensamento
  static createPensamentoSave(req, res) {
    // dados do novo pensamento
    const newPensamento = {
      // texto digitado
      title: req.body.title,
      // dono do pensamento: o usuário logado
      UserId: req.session.userid,
    }

    // insere no banco
    Pensamento.create(newPensamento)
      // depois de salvar
      .then(() => {
        // mensagem de sucesso
        req.flash('message', 'Pensamento criado com sucesso!')
        // salva a sessão (com a mensagem) e redireciona para o painel
        req.session.save(() => {
          res.redirect('/Pensamentos/dashboard')
        })
      })
      // erro: mostra no terminal
      .catch((err) => console.log(err))
  }

  // lista todos os pensamentos (página inicial), com busca e ordenação
  static showPensamentos(req, res) {
    // mostra os parâmetros da URL (?search=...&order=...)
    console.log(req.query)

    // verifica se o usuário está buscando algo
    let search = ''

    // se veio ?search=texto, usa o texto na busca
    if (req.query.search) {
      search = req.query.search
    }

    // ordena os resultados, mais novos primeiro
    let order = 'DESC'

    // ?order=old: mais antigos primeiro (ASC = crescente)
    if (req.query.order === 'old') {
      order = 'ASC'
    } else {
      // padrão: mais novos primeiro (DESC = decrescente)
      order = 'DESC'
    }

    // busca os pensamentos
    Pensamento.findAll({
      // traz junto o usuário que escreveu cada um
      include: User,
      // filtro
      where: {
        // LIKE '%texto%': title contém o texto buscado em qualquer posição
        title: { [Op.like]: `%${search}%` },
      },
      // ordena pela data de criação
      order: [['createdAt', order]],
    })
      // data é o array de pensamentos encontrados
      .then((data) => {
        // quantidade de resultados
        let PensamentosQty = data.length

        // 0 vira false para a view usar no {{#if}}
        if (PensamentosQty === 0) {
          PensamentosQty = false
        }

        // converte cada resultado (com o User junto) em objeto simples para o Handlebars
        const Pensamentos = data.map((result) => result.get({ plain: true }))

        // renderiza a home com a lista, a quantidade e o termo buscado
        res.render('pensamentos/home', { Pensamentos, PensamentosQty, search })
      })
      // erro: mostra no terminal
      .catch((err) => console.log(err))
  }

  // remove um pensamento
  static removePensamento(req, res) {
    // id enviado pelo formulário (campo escondido)
    const id = req.body.id

    // só remove se o pensamento for do usuário logado (UserId na condição)
    Pensamento.destroy({ where: { id: id, UserId: req.session.userid } })
      .then(() => {
        // mensagem de sucesso
        req.flash('message', 'Pensamento removido com sucesso!')
        // salva a sessão e volta para o painel
        req.session.save(() => {
          res.redirect('/Pensamentos/dashboard')
        })
      })
      .catch((err) => console.log(err))
  }

  // mostra o formulário de edição
  static updatePensamento(req, res) {
    // id vindo da URL
    const id = req.params.id

    // busca o pensamento, garantindo que é do usuário logado; raw: true retorna objeto simples
    Pensamento.findOne({ where: { id: id, UserId: req.session.userid }, raw: true })
      // envia o pensamento encontrado para a view de edição
      .then((Pensamento) => {
        res.render('pensamentos/edit', { Pensamento })
      })
      .catch((err) => console.log(err))
  }

  // salva a edição
  static updatePensamentoPost(req, res) {
    // id enviado pelo formulário
    const id = req.body.id

    // novos dados
    const updatedPensamento = {
      title: req.body.title,
      // atenção: o model Pensamento não tem a coluna description (esse campo é ignorado)
      description: req.body.description,
    }

    // atualiza somente se o pensamento for do usuário logado
    Pensamento.update(updatedPensamento, { where: { id: id, UserId: req.session.userid } })
      .then(() => {
        // mensagem de sucesso
        req.flash('message', 'Pensamento atualizado com sucesso!')
        // salva a sessão e volta para o painel
        req.session.save(() => {
          res.redirect('/Pensamentos/dashboard')
        })
      })
      .catch((err) => console.log(err))
  }
}
