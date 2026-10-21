// importa o Express, framework para criar o servidor e as rotas
const express = require('express');
// Router cria um conjunto de rotas que depois é ligado ao app com app.use
const router = express.Router();

// importa o controller TaskController, que contém a lógica das rotas
const TaskController = require('../controllers/TaskController');

// GET /add -> executa TaskController.createTasks
router.get('/add', TaskController.createTasks);
// GET / -> executa TaskController.showTasks
router.get('/', TaskController.showTasks);

// exporta router para ser usado em outros arquivos com require
module.exports = router;