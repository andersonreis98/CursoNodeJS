// importa o jsonwebtoken (JWT)
const jwt = require("jsonwebtoken");

// middleware que valida o token
// middleware que protege as rotas: só passa quem envia um token válido
const checkToken = (req, res, next) => {
  // o token vem no cabeçalho Authorization no formato "Bearer <token>"
  const authHeader = req.headers["authorization"];
  // separa no espaço e pega a segunda parte (o token); se não há cabeçalho, fica undefined
  const token = authHeader && authHeader.split(" ")[1];

  // sem token: 401 = não autorizado
  if (!token) return res.status(401).json({ message: "Acesso negado!" });

  // tenta validar o token
  try {
    // verify confere a assinatura com o segredo; se for inválido ou expirado, lança erro
    const verified = jwt.verify(token, "nossosecret");
    // guarda os dados do token (name e id) para as próximas funções
    req.user = verified;
    next(); // para continuar o fluxo
  // token inválido
  } catch (err) {
    // 400 = requisição inválida
    res.status(400).json({ message: "O Token é inválido!" });
  }
};

// exporta o middleware
module.exports = checkToken;
