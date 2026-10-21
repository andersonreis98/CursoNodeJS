// importa o Express e já cria o roteador
const router = require("express").Router();
// bcrypt: hash de senhas
const bcrypt = require("bcrypt");

// importa o model User
const User = require("../models/user");

// middlewares
// valida o token
const verifyToken = require("../helpers/check-token");

// helpers (funções auxiliares)
// busca o usuário pelo token
const getUserByToken = require("../helpers/get-user-by-token");

// GET /api/user/:id -> dados de um usuário
router.get("/:id", verifyToken, async (req, res) => {

    // id da URL
    const id = req.params.id;

    // verifica o usuário
    // o segundo argumento { password: 0 } é a projeção: traz tudo menos a senha
    const user = await User.findOne({ _id: id }, {password: 0});

    // não encontrado
    if (!user) {
        return res.status(400).json({ error: "O usuário não existe!" });
    }

    // encontrado
    res.json({ error: null, user });

});

// Atualizar usuário
// PUT /api/user -> atualiza o usuário logado
router.put("/", verifyToken, async (req, res) => {

    // token do cabeçalho
    const token = req.header("auth-token");
    // usuário dono do token
    const user = await getUserByToken(token);
    // id enviado no corpo
    const userReqId = req.body.id;
    // senhas enviadas
    const password = req.body.password;
    const confirmPassword = req.body.confirmpassword;
  
    // id do usuário do token como texto (para comparar)
    const userId = user._id.toString();
  
    // verifica se o id enviado é o mesmo do usuário do token
    if(userId != userReqId) {
  
      // atenção: falta "return"; o código continua e responde de novo mais abaixo
      res.status(401).json({ error: "Acesso negado!" });
  
    }

    // monta o objeto com os dados a atualizar
    const updateData = {
      name: req.body.name,
      email: req.body.email
    };

    // verifica se as senhas conferem
    if(password != confirmPassword) {

      // atenção: também falta "return" aqui
      res.status(401).json({ error: "As senhas não conferem." });
    
    // troca a senha
    } else if(password == confirmPassword && password != null) {

      // criando a senha
      const salt = await bcrypt.genSalt(12);
      const reqPassword = req.body.password;

      // hash da nova senha
      const passwordHash = await bcrypt.hash(reqPassword, salt);

      // guarda o hash no corpo da requisição (não é usado depois)
      req.body.password = passwordHash;

      // atualizando os dados
      updateData.password = passwordHash;

    }
  
    // tenta atualizar
    try {      
  
      // retorna os dados atualizados ({ new: true } devolve o documento já alterado)
      const updatedUser = await User.findOneAndUpdate({ _id: userId }, { $set:  updateData}, {new: true});
      res.json({ error: null, msg: "Usuário atualizado com sucesso!", data: updatedUser });
  
    // erro ao atualizar
    } catch (error) {
  
      res.status(400).json({ error })
        
    }
  
  });

// exporta o roteador
module.exports = router;