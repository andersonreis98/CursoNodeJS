const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskController');

router.get('/add', TaskController.createTasks);
router.post('/add', TaskController.createTasksSave);
router.post('/remove', TaskController.removeTask);
router.get('/', TaskController.showTasks);

module.exports = router;