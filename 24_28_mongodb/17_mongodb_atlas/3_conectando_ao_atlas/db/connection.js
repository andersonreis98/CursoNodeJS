// MongoClient: cliente oficial do MongoDB
const { MongoClient } = require('mongodb')
// usuário e senha do Atlas, lidos do arquivo .env (não ficam expostos no código)
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
// endereço do cluster no MongoDB Atlas (banco na nuvem); "mongodb+srv" busca os servidores pelo DNS
const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.khyn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

// guarda o client conectado
let _db

// abre a conexão e chama o callback "cb" quando terminar
const initDb = (cb) => {
  // useUnifiedTopology era uma opção das versões antigas do driver (hoje é ignorada)
  MongoClient.connect(url, { useUnifiedTopology: true })
    // conectou: guarda o client e avisa que deu certo
    .then((client) => {
      _db = client
      cb(null, _db)
    })
    // falhou: passa o erro para o callback
    .catch((err) => {
      cb(err)
    })
}

// devolve o client já conectado
const getDb = () => {
  return _db
}

// exporta as duas funções
module.exports = {
  initDb,
  getDb,
}
