// importa o Sequelize, ORM que traduz objetos JavaScript em comandos SQL
const {DataTypes} = require('sequelize');
// importa a conexão com o banco de dados (arquivo db/conn.js)
const db = require('../db/conn');

// define o model Task: o Sequelize cria a tabela correspondente no banco
const Task = db.define('Task', {
    // configuração da coluna title
    title: {
        // tipo texto (VARCHAR)
        type: DataTypes.STRING,
        // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
        required: true,
    },
    // configuração da coluna description
    description: {
        // tipo texto (VARCHAR)
        type: DataTypes.STRING,
        // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
        required: true,
    },
    // configuração da coluna done
    done: {
        // tipo verdadeiro/falso
        type: DataTypes.BOOLEAN,
        // required não é uma opção do Sequelize (é ignorada); o correto seria allowNull: false
        required: true,
    },

});

// exporta Task para ser usado em outros arquivos com require
module.exports = Task;