// importa os tipos de dados do Sequelize
const { DataTypes } = require("sequelize");

// importa a conexão com o banco
const db = require("../db/conn");

// define o model User (o Sequelize cria a tabela "Users")
const User = db.define("User", {
  // coluna name
  name: {
    // tipo texto
    type: DataTypes.STRING,
    // obrigatório
    allowNull: false,
  },
  // coluna email
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // coluna password (guarda o hash da senha, nunca a senha pura)
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// exporta o model
module.exports = User;
