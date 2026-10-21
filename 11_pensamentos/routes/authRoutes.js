// importa o Express
const express = require('express')
// cria o roteador
const router = express.Router()
// importa o controller de autenticação
const AuthController = require('../controllers/AuthController')

// GET /login -> mostra o formulário de login
router.get('/login', AuthController.login)
// POST /login -> valida e faz o login
router.post('/login', AuthController.loginPost)
// GET /register -> mostra o formulário de cadastro
router.get('/register', AuthController.register)
// POST /register -> cria o usuário
router.post('/register', AuthController.registerPost)
// GET /logout -> encerra a sessão
router.get('/logout', AuthController.logout)

// exporta o roteador
module.exports = router
