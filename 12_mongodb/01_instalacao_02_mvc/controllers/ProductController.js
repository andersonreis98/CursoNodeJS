// importa o model Product, que representa a tabela/coleção no banco
const Product = require("../models/Product");

// exporta a classe ToughController; os métodos static podem ser usados sem criar instância
module.exports = class ToughController {
  // método showProducts: recebe a requisição e a resposta da rota
  static showProducts(req, res) {
    // renderiza a view views/products/all.handlebars
    res.render("products/all");
  }
};
