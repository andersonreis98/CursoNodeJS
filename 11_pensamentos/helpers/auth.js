// middleware que protege rotas: só deixa passar quem está logado
module.exports.checkAuth = function (req, res, next) {
  // id do usuário salvo na sessão no momento do login
  const userId = req.session.userid

  // se não existe, o usuário não está logado: manda para a tela de login
  if (!userId) {
    return res.redirect('/login')
  }

  // usuário logado: segue para a rota
  next()
}
