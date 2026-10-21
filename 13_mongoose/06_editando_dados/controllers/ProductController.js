// importa o model Product, que representa a tabela/coleção no banco
const Product = require('../models/Product')

// exporta a classe ToughController; os métodos static podem ser usados sem criar instância
module.exports = class ToughController {
  // método showProducts: async porque usa await para esperar o banco
  static async showProducts(req, res) {

    // busca todos os documentos de Product; lean() retorna objetos simples, que o Handlebars consegue ler
    const products = await Product.find().lean()

    // renderiza a view products/all enviando { products } para o template
    res.render('products/all', { products })
  }

  // método editProduct: async porque usa await para esperar o banco
  static async editProduct(req, res) {
    // parâmetro "id" vindo da URL
    const id = req.params.id
    // busca o documento pelo _id; lean() retorna objeto simples
    const product = await Product.findById(id).lean()

    // se product não existe (null/undefined)
    if (!product) {
      // responde 404 (não encontrado) e encerra
      return res.status(404).send('Produto não encontrado')
    }

    // renderiza a view products/edit enviando { product } para o template
    res.render('products/edit', { product })
  }

  // static async editProductPost(req, res) {
  //   const id = req.params.id
  //   const name = req.body.name
  //   const image = req.body.image
  //   const price = req.body.price
  //   const description = req.body.description

  //   await Product.updateProductById(id, name, image, price, description)

  //   res.redirect('/')
  // }

  // static async removeProduct(req, res) {
  //   const id = req.params.id

  //   await Product.removeProductById(id)

  //   res.redirect('/')
  // }

  static async getProduct(req, res) {
    
    // parâmetro "id" vindo da URL
    const id = req.params.id
    // busca o documento pelo _id; lean() retorna objeto simples
    const product = await Product.findById(id).lean() 

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

  // método createProductPost: async porque usa await para esperar o banco
  static async createProductPost(req, res) {
    // valor do campo "name" enviado no corpo da requisição
    const name = req.body.name
    // valor do campo "image" enviado no corpo da requisição
    const image = req.body.image
    // valor do campo "price" enviado no corpo da requisição
    const price = req.body.price
    // valor do campo "description" enviado no corpo da requisição
    const description = req.body.description

    // cria um novo documento Product (ainda não salvo) com os campos name, image, price, description
    const product = new Product({name, image, price, description})

    // salva o documento no banco e espera terminar
    await product.save()

    // redireciona o navegador para /products
    res.redirect('/products')
  }
}
