const Task = require('../models/Task');

module.exports = class TaskController {
    static async createTasks(req, res) {
        res.render('tasks/create');
    }
}