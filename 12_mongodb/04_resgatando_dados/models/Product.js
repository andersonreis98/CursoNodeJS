// importa a conexão com o banco de dados (arquivo db/conn.js)
const conn = require('../db/conn')

// classe Product: o model que conversa com a coleção no MongoDB
class Product {
  // construtor: executado ao criar um objeto com new; guarda os dados recebidos
  constructor(name, image, price, description) {
    // guarda name na propriedade name do objeto
    this.name = name
    // guarda image na propriedade image do objeto
    this.image = image
    // guarda price na propriedade price do objeto
    this.price = price
    // guarda description na propriedade description do objeto
    this.description = description
  }

  // método save da instância
  save() {
    // insertOne insere um documento na coleção "products"
    const product = conn.db().collection('products').insertOne({
      // campo name recebe o valor guardado no objeto
      name: this.name,
      // campo image recebe o valor guardado no objeto
      image: this.image,
      // campo price recebe o valor guardado no objeto
      price: this.price,
      // campo description recebe o valor guardado no objeto
      description: this.description,
    })

    // retorna product
    return product
  }
  // método estático assíncrono getProducts
  static async getProducts() {
    // find() busca todos os documentos; toArray() converte o resultado em array
    const products = conn.db().collection('products').find().toArray()

    // retorna products
    return products
  }
}


// exporta Product para ser usado em outros arquivos com require
module.exports = Product
