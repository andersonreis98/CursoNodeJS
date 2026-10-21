// importa o model Product, que representa a tabela/coleção no banco
const Product = require('../models/Product')

// exporta a classe ToughController; os métodos static podem ser usados sem criar instância
module.exports = class ToughController {
  // método showProducts: recebe a requisição e a resposta da rota
  static showProducts(req, res) {
    // renderiza a view views/products/all.handlebars
    res.render('products/all')
  }

  // método createProduct: recebe a requisição e a resposta da rota
  static createProduct(req, res) {
    // renderiza a view views/products/create.handlebars
    res.render('products/create')
  }

  // método createProductPost: recebe a requisição e a resposta da rota
  static createProductPost(req, res) {
    // valor do campo "name" enviado no corpo da requisição
    const name = req.body.name
    // valor do campo "price" enviado no corpo da requisição
    const price = req.body.price
    // valor do campo "description" enviado no corpo da requisição
    const description = req.body.description

    // cria um novo objeto Product com os dados recebidos
    const product = new Product(name, price, description)

    // chama o método save, que insere o documento no banco
    product.save()

    // redireciona o navegador para /
    res.redirect('/')
  }
}
