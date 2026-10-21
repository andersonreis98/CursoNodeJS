// importa o mongoose já configurado com a conexão
const mongoose = require('../db/conn')
// Schema define a estrutura dos documentos
const { Schema } = mongoose

// cria o model User (coleção "users" no banco)
const User = mongoose.model(
  // nome do model
  'User',
  // estrutura do documento
  new Schema({
    // nome: obrigatório
    name: {
      type: String,
      required: true,
    },
    // e-mail: obrigatório
    email: {
      type: String,
      required: true,
    },
    // senha: guarda o hash gerado pelo bcrypt
    password: {
      type: String,
      required: true,
    },
    // nome do arquivo da foto de perfil (opcional)
    image: {
      type: String,
    },
    // telefone (opcional)
    phone: {
      type: String,
    },
  // cria createdAt e updatedAt automaticamente
  }, {timestamps: true}),
)

// exporta o model
module.exports = User
