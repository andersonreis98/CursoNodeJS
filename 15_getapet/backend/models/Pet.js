// importa o mongoose já configurado com a conexão
const mongoose = require('../db/conn')
// Schema define a estrutura dos documentos
const { Schema } = mongoose

// cria o model Pet (coleção "pets" no banco)
const Pet = mongoose.model(
  // nome do model
  'Pet',
  // estrutura do documento
  new Schema({
    // nome do pet: texto obrigatório
    name: {
      type: String,
      required: true,
    },
    // idade: número obrigatório
    age: {
      type: Number,
      required: true,
    },
    // descrição: texto opcional
    description: {
      type: String,
    },
    // peso: número obrigatório
    weight: {
      type: Number,
      required: true,
    },
    // cor: texto obrigatório
    color: {
      type: String,
      required: true,
    },
    // lista com os nomes dos arquivos de imagem
    images: {
      type: Array,
      required: true,
    },
    // se o pet ainda está disponível para adoção
    available: {
      type: Boolean,
    },
    // dados do dono que cadastrou o pet (objeto simples)
    user: Object,
    // dados de quem quer adotar / adotou
    adopter: Object,
  // timestamps: true cria os campos createdAt e updatedAt automaticamente
  }, {timestamps: true}),
)

// exporta o model
module.exports = Pet
