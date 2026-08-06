const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('nodemvc', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
});

try {
	sequelize.authenticate();
	console.log('Conectamos com sucesso com o sequelize');
} catch (error) {
	console.error('Não foi possivel se conectar: ', error);
}

module.exports = sequelize;
