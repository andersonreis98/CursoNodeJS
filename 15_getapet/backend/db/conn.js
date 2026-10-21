// importa o Mongoose
const mongoose = require('mongoose')

// função assíncrona que conecta ao banco
async function main() {
  // conecta ao MongoDB local, no banco "getapetref"
  await mongoose.connect('mongodb://localhost:27017/getapetref')
  // confirma a conexão
  console.log('Conectou com Mongoose!')
}

// executa a conexão; se falhar, mostra o erro
main().catch((err) => console.log(err))

// exporta o mongoose para os models usarem
module.exports = mongoose
