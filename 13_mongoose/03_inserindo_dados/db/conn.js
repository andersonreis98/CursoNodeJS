// importa o Mongoose, ODM que facilita trabalhar com o MongoDB usando schemas e models
const mongoose = require('mongoose')

// função assíncrona que faz a conexão
async function main() {
  // conecta ao MongoDB local, no banco "testemongoose" (é criado automaticamente se não existir)
  await mongoose.connect('mongodb://localhost:27017/testemongoose')
  // confirma a conexão
  console.log('Conectado ao MongoDB com mongoose')
}
// executa a conexão; se falhar, mostra o erro no terminal
main().catch((err) => console.log(err))

// exporta o mongoose (a conexão é aberta pela função main acima)
module.exports = mongoose