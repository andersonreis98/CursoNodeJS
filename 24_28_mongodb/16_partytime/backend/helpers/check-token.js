// importa o jsonwebtoken (JWT)
const jwt = require("jsonwebtoken");

// middleware que valida o token
const checkToken = (req, res, next) => {

  // aqui o token vem no cabeçalho personalizado "auth-token"
  const token = req.header("auth-token");

  // sem token: 401 = não autorizado
  if (!token) return res.status(401).json({ error: "Acesso negado!" });

  // tenta validar
  try {
    // confere a assinatura com o segredo
    const verified = jwt.verify(token, "nossosecret");
    // guarda os dados do token para as próximas funções
    req.user = verified;
    next(); // para continuar o fluxo
  // token inválido
  } catch (err) {
    res.status(400).json({ error: "O Token é inválido!" });
  }

};

// exporta o middleware
module.exports = checkToken;