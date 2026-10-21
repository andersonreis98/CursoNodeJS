// importa o Mongoose
const mongoose = require("mongoose");

// estrutura dos documentos de festa
const PartySchema = new mongoose.Schema({
  // título: obrigatório
  title: {
    type: String,
    required: true
  },
  // descrição
  description: {
    type: String
  },
  // data da festa
  partyDate: {
    type: Date
  },
  // lista com os caminhos das fotos
  photos: {
    type: Array
  },
  // true = festa privada (só o dono vê)
  privacy: {
    type: Boolean
  },
  // id do usuário dono da festa
  userId: {
    type: mongoose.ObjectId
  }
});

// cria o model Party (coleção "parties")
const Party = mongoose.model("Party", PartySchema);

// exporta o model
module.exports = Party;