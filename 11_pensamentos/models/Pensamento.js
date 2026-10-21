// importa os tipos de dados do Sequelize
const { DataTypes } = require("sequelize");

// importa a conexão com o banco
const db = require("../db/conn");

// importa o model User para criar o relacionamento
const User = require("./User");

// define o model Pensamento (o Sequelize cria a tabela "Pensamentos")
const Pensamento = db.define("Pensamento", {
  // coluna title
  title: {
    // tipo texto
    type: DataTypes.STRING,
    // campo obrigatório
    allowNull: false,
  },
});

// cada pensamento pertence a um usuário (cria a coluna UserId na tabela Pensamentos)
Pensamento.belongsTo(User);
// um usuário tem vários pensamentos (permite include: Pensamento ao buscar User)
User.hasMany(Pensamento);

// exporta o model
module.exports = Pensamento;
