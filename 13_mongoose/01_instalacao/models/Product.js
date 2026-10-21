// importa a conexão com o banco de dados (arquivo db/conn.js)
const conn = require('../db/conn')

// ObjectId converte uma string no tipo de id usado pelo MongoDB
const { ObjectId } = require('mongodb')

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
  // método estático assíncrono getProductById
  static async getProductById(id) {
    // se o id não tem o formato de ObjectId (24 caracteres hexadecimais), não busca no banco
    if (!ObjectId.isValid(id)) {
      // retorna null para indicar que nada foi encontrado
      return null
    }

    // espera o resultado da busca abaixo (a expressão continua nas próximas linhas)
    const product = await
    // cliente do MongoDB
    conn
    // db() acessa o banco definido na URI
    .db()
    // acessa a coleção "products"
    .collection('products')
    // busca um documento pelo _id (convertido para ObjectId)
    .findOne({ _id: new ObjectId(id) })

    // retorna product
    return product
  }
  // método estático assíncrono removeProductById
  static async removeProductById(id) {    
    // deleteOne remove o documento com esse _id
    await conn.db().collection('products').deleteOne({ _id: new ObjectId(id) })
    
    // interrompe a função
    return
  }
  // método estático assíncrono updateProductById
  static async updateProductById(id, name, image, price, description) {
    // updateOne atualiza o documento: $set altera só os campos informados
    await conn.db().collection('products').updateOne({ _id: new ObjectId(id) }, { $set: { name, image, price, description } })

    // interrompe a função
    return
  }
}


// exporta Product para ser usado em outros arquivos com require
module.exports = Product
