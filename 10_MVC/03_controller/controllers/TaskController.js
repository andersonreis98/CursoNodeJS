// importa o model Task, que representa a tabela/coleção no banco
const Task = require('../models/Task');

// exporta a classe TaskController; os métodos static podem ser usados sem criar instância
module.exports = class TaskController {
    // método createTasks: async porque usa await para esperar o banco
    static async createTasks(req, res) {
        // renderiza a view views/tasks/create.handlebars
        res.render('tasks/create');
    }
}