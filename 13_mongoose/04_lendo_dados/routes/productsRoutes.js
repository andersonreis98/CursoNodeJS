// importa o Express, framework para criar o servidor e as rotas
const express = require("express");
// Router cria um conjunto de rotas que depois é ligado ao app com app.use
const router = express.Router();
// importa o controller ProductController, que contém a lógica das rotas
const ProductController = require("../controllers/ProductController");

// get /create -> executa ProductController.createProduct
router.get("/create", ProductController.createProduct);
// post /create -> executa ProductController.createProductPost
router.post("/create", ProductController.createProductPost);
// router.get("/:id", ProductController.getProduct);
// router.post("/remove/:id", ProductController.removeProduct);
// router.get("/edit/:id", ProductController.editProduct);
// router.post("/edit/:id", ProductController.editProductPost);
router.get("/", ProductController.showProducts);

// exporta router para ser usado em outros arquivos com require
module.exports = router;