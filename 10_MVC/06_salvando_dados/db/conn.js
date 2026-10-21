// importa o Sequelize, ORM que traduz objetos JavaScript em comandos SQL
const { Sequelize } = require('sequelize');
// cria a conexão: banco "nodemvc", usuário "root" e senha (terceiro argumento)
const sequelize = new Sequelize('nodemvc', 'root', '', {
	// endereço do servidor do banco
	host: 'localhost',
	// tipo de banco usado (mysql)
	dialect: 'mysql',
});

// tenta executar o bloco; se der erro, cai no catch
try {
	// testa a conexão (atenção: sem await, o try/catch não captura uma falha de conexão)
	sequelize.authenticate();
	// mensagem de sucesso na conexão
	console.log('Conectamos com sucesso com o sequelize');
// captura o erro lançado dentro do try
} catch (error) {
	// mensagem de erro na conexão
	console.error('Não foi possivel se conectar: ', error);
}

// exporta sequelize para ser usado em outros arquivos com require
module.exports = sequelize;
