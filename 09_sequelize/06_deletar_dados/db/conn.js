// importa o Sequelize, ORM que traduz objetos JavaScript em comandos SQL
const {Sequelize} = require('sequelize')
// cria a conexão: banco "nodemysql", usuário "root" e senha (terceiro argumento)
const sequelize = new Sequelize('nodemysql', 'root', '', {
  // endereço do servidor do banco
  host: 'localhost',
  // tipo de banco usado (mysql)
  dialect: 'mysql'
})
// try {
//   sequelize.authenticate()
//   console.log('Conectamos com sucesso com o sequelize')
// }
// catch (error) {
//   console.error('Não foi possivel se conectar: ', error)
// }

module.exports = sequelize;