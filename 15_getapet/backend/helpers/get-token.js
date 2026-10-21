// pega o token dos cabeçalhos
const getToken = (req) => {
  // cabeçalho Authorization: "Bearer <token>"
  const authHeader = req.headers["authorization"];
  // pega só o token (depois do espaço)
  const token = authHeader && authHeader.split(" ")[1];

  // devolve o token (ou undefined se não houver)
  return token;
};

// exporta a função
module.exports = getToken;
