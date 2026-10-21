// importa o jsonwebtoken (JWT)
const jwt = require("jsonwebtoken");

// importa o model User
const User = require("../models/user");

// busca o usuário a partir do token JWT
const getUserByToken = async (token) => {

  // atenção: "res" não existe nesta função; sem token esta linha lança um ReferenceError
  if (!token) return res.status(401).json({ error: "Acesso negado!" });
    
  // procura o usuário
  // decodifica o token e recupera os dados (id)
  const decoded = jwt.verify(token, 'nossosecret');

  // id do usuário guardado no token
  const userId = decoded.id;

  // busca no banco
  const user = await User.findOne({ _id: userId });

  // devolve o usuário
  return user;

}

// exporta a função
module.exports = getUserByToken;