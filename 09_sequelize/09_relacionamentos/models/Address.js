// importa o Sequelize, ORM que traduz objetos JavaScript em comandos SQL
const{DataTypes} = require('sequelize');
// importa a conexão com o banco de dados (arquivo db/conn.js)
const db = require('../db/conn');
// importa o módulo local ./User
const User = require('./User');

// define o model Address: o Sequelize cria a tabela correspondente no banco
const Address = db.define('Address', {
  // configuração da coluna street
  street: {
    // tipo texto (VARCHAR)
    type: DataTypes.STRING,
    // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
    required: true,
  },
  // configuração da coluna number
  number: {
    // tipo número inteiro
    type: DataTypes.INTEGER,
    // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
    required: true,
  },
  // configuração da coluna city
  city: {
    // tipo texto (VARCHAR)
    type: DataTypes.STRING,
    // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
    required: true,
  }
});

Address.belongsTo(User); // Um endereço pertence a um usuário

// exporta Address para ser usado em outros arquivos com require
module.exports = Address;   