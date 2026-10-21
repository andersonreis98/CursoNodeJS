// importa o Express, framework para criar o servidor e as rotas
const express = require('express');
// Router cria um conjunto de rotas que depois é ligado ao app com app.use
const router = express.Router();

// importa o controller TaskController, que contém a lógica das rotas
const TaskController = require('../controllers/TaskController');

// GET /add -> executa TaskController.createTasks
router.get('/add', TaskController.createTasks);
// POST /add -> executa TaskController.createTasksSave
router.post('/add', TaskController.createTasksSave);
// POST /remove -> executa TaskController.removeTask
router.post('/remove', TaskController.removeTask);
// GET /edit/:id -> executa TaskController.updateTask
router.get('/edit/:id', TaskController.updateTask);
// POST /edit -> executa TaskController.updateTaskPost
router.post('/edit', TaskController.updateTaskPost);
// GET / -> executa TaskController.showTasks
router.get('/', TaskController.showTasks);

// exporta router para ser usado em outros arquivos com require
module.exports = router;