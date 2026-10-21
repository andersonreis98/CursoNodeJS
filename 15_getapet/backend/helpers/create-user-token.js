// importa o jsonwebtoken (JWT)
const jwt = require("jsonwebtoken");

// cria o token do usuário e já envia a resposta de login/cadastro
const createUserToken = async (user, req, res) => {
  // sign gera o token assinado com o segredo
  const token = jwt.sign(
    // dados guardados dentro do token (payload)
    {
      // nome do usuário
      name: user.name,
      // id do usuário no MongoDB
      id: user._id,
    },
    // segredo usado para assinar (em produção deve ficar no .env)
    "nossosecret"
  );

  // retorna o token
  // responde com o token; o front-end guarda e envia nas próximas requisições
  res.status(200).json({
    message: "Você está autenticado!",
    token: token,
    userId: user._id,
  });
};

// exporta a função
module.exports = createUserToken;
