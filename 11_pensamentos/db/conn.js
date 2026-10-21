// importa o Sequelize (aqui sem desestruturação: a exportação padrão já é a classe)
const Sequelize = require('sequelize');
// cria a conexão: banco "pensamentos", usuário "root", senha vazia
const sequelize = new Sequelize('pensamentos', 'root', '', {
    // endereço do servidor MySQL
    host: 'localhost',
    // tipo de banco
    dialect: 'mysql',
});
// função assíncrona que se executa sozinha (IIFE), para poder usar await fora de uma função
(async () => {
    // tenta conectar
    try {
        // authenticate testa a conexão; o await espera a resposta
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    // se falhar, mostra o erro
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados:', error);
    }
})();
// exporta a conexão para os models e o index.js
module.exports = sequelize;