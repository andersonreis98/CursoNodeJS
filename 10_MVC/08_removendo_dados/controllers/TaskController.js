// importa o model Task, que representa a tabela/coleção no banco
const Task = require('../models/Task');

// exporta a classe TaskController; os métodos static podem ser usados sem criar instância
module.exports = class TaskController {
	// método createTasks: recebe a requisição e a resposta da rota
	static createTasks(req, res) {
		// renderiza a view views/tasks/create.handlebars
		res.render('tasks/create');
	}
	// método createTasksSave: async porque usa await para esperar o banco
	static async createTasksSave(req, res) {
		// monta o objeto task
		const task = {
			// campo title recebe o valor "title" enviado pelo formulário
			title: req.body.title,
			// campo description recebe o valor "description" enviado pelo formulário
			description: req.body.description,
			// toda tarefa nova começa como não concluída
			done: false,
		};

		// insere um novo registro de Task no banco (INSERT)
		await Task.create(task);
		// redireciona o navegador para /tasks (atenção: res.redirect não retorna Promise, então este .catch gera um erro depois do redirect)
		res.redirect('/tasks').catch(err => console.log(err));
	}
	// método removeTask: async porque usa await para esperar o banco
	static async removeTask(req, res) {
		// valor do campo "id" enviado no corpo da requisição
		const id = req.body.id;
		// remove o registro de Task que atende ao where (DELETE)
		await Task.destroy({ where: { id: id } });
		// redireciona o navegador para /tasks (atenção: res.redirect não retorna Promise, então este .catch gera um erro depois do redirect)
		res.redirect('/tasks').catch(err => console.log(err));
	}
	
	// método showTasks: async porque usa await para esperar o banco
	static async showTasks(req, res) {

		// busca todos os registros de Task; raw: true retorna objetos simples, que o Handlebars consegue ler
		const tasks = await Task.findAll({ raw: true });
		
		// renderiza a view tasks/all enviando {tasks} para o template
		res.render('tasks/all',{tasks});
	}

};
