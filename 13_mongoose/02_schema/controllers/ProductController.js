// importa o model Product, que representa a tabela/coleção no banco
const Product = require('../models/Product')

// exporta a classe ToughController; os métodos static podem ser usados sem criar instância
module.exports = class ToughController {
  // método showProducts: async porque usa await para esperar o banco
  static async showProducts(req, res) {

    // chama Product.getProducts e espera o resultado
    const products = await Product.getProducts()

    // renderiza a view products/all enviando { products } para o template
    res.render('products/all', { products })
  }

  // método editProduct: async porque usa await para esperar o banco
  static async editProduct(req, res) {
    // parâmetro "id" vindo da URL
    const id = req.params.id
    // chama Product.getProductById e espera o resultado
    const product = await Product.getProductById(id)

    // se product não existe (null/undefined)
    if (!product) {
      // responde 404 (não encontrado) e encerra
      return res.status(404).send('Produto não encontrado')
    }

    // renderiza a view products/edit enviando { product } para o template
    res.render('products/edit', { product })
  }

  // método editProductPost: async porque usa await para esperar o banco
  static async editProductPost(req, res) {
    // parâmetro "id" vindo da URL
    const id = req.params.id
    // valor do campo "name" enviado no corpo da requisição
    const name = req.body.name
    // valor do campo "image" enviado no corpo da requisição
    const image = req.body.image
    // valor do campo "price" enviado no corpo da requisição
    const price = req.body.price
    // valor do campo "description" enviado no corpo da requisição
    const description = req.body.description

    // chama Product.updateProductById e espera terminar
    await Product.updateProductById(id, name, image, price, description)

    // redireciona o navegador para /
    res.redirect('/')
  }

  // método removeProduct: async porque usa await para esperar o banco
  static async removeProduct(req, res) {
    // parâmetro "id" vindo da URL
    const id = req.params.id

    // chama Product.removeProductById e espera terminar
    await Product.removeProductById(id)

    // redireciona o navegador para /
    res.redirect('/')
  }

  // método getProduct: async porque usa await para esperar o banco
  static async getProduct(req, res) {
    
    // parâmetro "id" vindo da URL
    const id = req.params.id
    // chama Product.getProductById e espera o resultado
    const product = await Product.getProductById(id)

    // se product não existe (null/undefined)
    if (!product) {
      // responde 404 (não encontrado) e encerra
      return res.status(404).send('Produto não encontrado')
    }

    // renderiza a view products/product enviando { product } para o template
    res.render('products/product', { product })
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
    // valor do campo "image" enviado no corpo da requisição
    const image = req.body.image
    // valor do campo "price" enviado no corpo da requisição
    const price = req.body.price
    // valor do campo "description" enviado no corpo da requisição
    const description = req.body.description

    // cria um novo objeto Product com os dados recebidos
    const product = new Product(name, image, price, description)

    // chama o método save, que insere o documento no banco
    product.save()

    // redireciona o navegador para /
    res.redirect('/')
  }
}
