const Task = require('../models/Task');

module.exports = class TaskController {
    static createTasks(req, res) {
        res.render('tasks/create');
    }
    static async showTasks(req, res) {
        res.render('tasks/all');
    }

}