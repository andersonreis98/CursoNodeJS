// importa o model Product, que representa a tabela/coleção no banco
const Product = require('../models/Product')

// exporta a classe ToughController; os métodos static podem ser usados sem criar instância
module.exports = class ToughController {
  // static async showProducts(req, res) {

  //   const products = await Product.getProducts()

  //   res.render('products/all', { products })
  // }

  // static async editProduct(req, res) {
  //   const id = req.params.id
  //   const product = await Product.getProductById(id)

  //   if (!product) {
  //     return res.status(404).send('Produto não encontrado')
  //   }

  //   res.render('products/edit', { product })
  // }

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

  // static async getProduct(req, res) {
    
  //   const id = req.params.id
  //   const product = await Product.getProductById(id)

  //   if (!product) {
  //     return res.status(404).send('Produto não encontrado')
  //   }

  //   res.render('products/product', { product })
  // }

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
