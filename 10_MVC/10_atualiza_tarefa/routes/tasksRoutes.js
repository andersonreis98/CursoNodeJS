const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskController');

router.get('/add', TaskController.createTasks);
router.post('/add', TaskController.createTasksSave);
router.post('/remove', TaskController.removeTask);
router.get('/edit/:id', TaskController.updateTask);
router.post('/edit', TaskController.updateTaskPost);
router.get('/', TaskController.showTasks);

module.exports = router;