// MongoClient: cliente oficial do MongoDB
const {MongoClient} = require('mongodb');
// endereço do banco local "notesDb"
const url = "mongodb://localhost:27017/notesDb";

// guarda o client conectado (o "_" indica variável de uso interno do módulo)
let _db;

// abre a conexão e chama o callback "cb" quando terminar
const initDb = cb => {

  // useUnifiedTopology era uma opção das versões antigas do driver (hoje é ignorada)
  MongoClient.connect(url, { useUnifiedTopology: true })
    // conectou: guarda o client e avisa que deu certo (erro = null)
    .then(client => {
      _db = client;
      cb(null, _db);
    })
    // falhou: passa o erro para o callback
    .catch(err => {
      cb(err);
    });

}

// devolve o client já conectado, para as rotas usarem
const getDb = () => {

  return _db;

}

// exporta as duas funções
module.exports = {
  initDb,
  getDb
}