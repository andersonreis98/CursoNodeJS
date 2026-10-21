// importa o Mongoose
const mongoose = require("mongoose");

// estrutura dos documentos de usuário
const UserSchema = new mongoose.Schema({
  // nome
  name: {
    type: String
  },
  // e-mail: obrigatório
  email: {
    type: String,
    required: true
  },
  // senha (hash): obrigatória
  password: {
    type: String,
    required: true
  }
  
})

// cria o model User (coleção "users")
const User = mongoose.model('User', UserSchema);

// exporta o model
module.exports = User;