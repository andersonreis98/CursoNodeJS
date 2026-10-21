// importa o Express, framework para criar o servidor e as rotas
const express = require("express");
// Router cria um conjunto de rotas que depois é ligado ao app com app.use
const router = express.Router();
// importa o controller ProductController, que contém a lógica das rotas
const ProductController = require("../controllers/ProductController");

// GET / -> executa ProductController.showProducts
router.get("/", ProductController.showProducts);

// exporta router para ser usado em outros arquivos com require
module.exports = router;
