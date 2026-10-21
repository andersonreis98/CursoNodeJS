// importa o Express
const express = require("express");
// cria o roteador
const router = express.Router();
// importa o controller dos pensamentos
const PensamentosController = require("../controllers/PensamentosController");

// importa o middleware que verifica se o usuário está logado
const checkAuth = require("../helpers/auth").checkAuth;

// GET /Pensamentos/add -> formulário de novo pensamento (exige login)
router.get("/add", checkAuth, PensamentosController.createPensamento);
// POST /Pensamentos/add -> salva o pensamento (exige login)
router.post("/add", checkAuth, PensamentosController.createPensamentoSave);
// POST /Pensamentos/remove -> remove um pensamento (exige login)
router.post("/remove", checkAuth, PensamentosController.removePensamento);
// GET /Pensamentos/edit/:id -> formulário de edição (exige login)
router.get("/edit/:id", checkAuth, PensamentosController.updatePensamento);
// POST /Pensamentos/edit -> salva a edição (exige login)
router.post("/edit", checkAuth, PensamentosController.updatePensamentoPost);
// GET /Pensamentos/dashboard -> pensamentos do usuário logado (exige login)
router.get("/dashboard", checkAuth, PensamentosController.dashboard);
// GET /Pensamentos -> lista pública de todos os pensamentos
router.get("/", PensamentosController.showPensamentos);

// exporta o roteador
module.exports = router;
