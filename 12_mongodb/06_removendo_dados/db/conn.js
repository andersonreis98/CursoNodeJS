// importa o MongoClient, cliente oficial para conectar ao MongoDB
const { MongoClient } = require("mongodb");
// URI de conexão
const uri = "mongodb://localhost:27017/testemongodb";
// Cria um novo MongoClient
const client = new MongoClient(uri);
// função assíncrona que abre a conexão
async function run() {
  // tenta executar o bloco; se der erro, cai no catch
  try {
    // conecta ao servidor do MongoDB (espera terminar)
    await client.connect();
    // confirma a conexão
    console.log("Conectado ao MongoDB!");
  // captura o erro lançado dentro do try
  } catch (err) {
    // mostra o erro no terminal
    console.log(err);
  }
}

// executa a função de conexão assim que o arquivo é carregado
run();

// exporta client para ser usado em outros arquivos com require
module.exports = client;
