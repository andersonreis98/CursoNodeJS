// importa o Mongoose, ODM que facilita trabalhar com o MongoDB usando schemas e models
const mongoose = require('mongoose')
// Schema define a estrutura (campos e tipos) dos documentos
const { Schema } = mongoose

// cria o model Product a partir de um Schema; a coleção no banco será "products" (o Mongoose converte o nome para minúsculo e plural)
const Product = mongoose.model('Product', new Schema({
  // campo name: texto obrigatório
  name:{type: String, required: true},
  // campo price: número obrigatório
  price: {type: Number, required: true},
  // campo image: texto obrigatório
  image: {type: String, required: true},
  // campo description: texto obrigatório
  description: {type: String, required: true},
}))
// exporta Product para ser usado em outros arquivos com require
module.exports = Product
