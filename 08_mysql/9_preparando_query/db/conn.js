// importa o driver do MySQL para o Node se comunicar com o banco
const mysql = require('mysql')

// cria um pool: um conjunto de conexões reutilizáveis, mais eficiente que abrir uma por requisição
const pool = mysql.createPool({
  // número máximo de conexões abertas ao mesmo tempo
  connectionLimit: 10,
  // endereço do servidor do banco
  host: 'localhost',
  // usuário do banco
  user: 'root',
  // senha do banco
  password: '',
  // nome do banco de dados
  database: 'nodemysql',
})

// exporta pool para ser usado em outros arquivos com require
module.exports = pool
