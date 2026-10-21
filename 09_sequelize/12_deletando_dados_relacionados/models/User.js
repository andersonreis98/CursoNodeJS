// importa o Sequelize, ORM que traduz objetos JavaScript em comandos SQL
const { DataTypes } = require('sequelize')
// importa a conexão com o banco de dados (arquivo db/conn.js)
const db = require('../db/conn')

// define o model User: o Sequelize cria a tabela correspondente no banco
const User = db.define('User', {
  // configuração da coluna name
  name: {
    // tipo texto (VARCHAR)
    type: DataTypes.STRING,
    // não aceita valor nulo (campo obrigatório no banco)
    allowNull: false
  },
  // configuração da coluna occupation
  occupation: {
    // tipo texto (VARCHAR)
    type: DataTypes.STRING,
    // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
    required: true,
  },
  // configuração da coluna newsletter
  newsletter: {
    // tipo verdadeiro/falso
    type: DataTypes.BOOLEAN,
  }
})

// exporta User para ser usado em outros arquivos com require
module.exports = User;