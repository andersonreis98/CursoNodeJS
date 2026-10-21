// importa o Express e já cria o roteador
const router = require("express").Router();
// jsonwebtoken (importado, mas não usado diretamente aqui)
const jwt = require("jsonwebtoken");
// multer: recebe arquivos (fotos)
const multer = require("multer");

// models
const Party = require("../models/party")
const User = require("../models/user");

// definindo onde os arquivos serão salvos
const diskStorage = require('../helpers/file-storage');
// middleware de upload configurado com o armazenamento em disco
const upload = multer({ storage: diskStorage })

// middlewares
// valida o token
const verifyToken = require("../helpers/check-token");

// helpers (funções auxiliares)
// busca o usuário pelo token
const getUserByToken = require("../helpers/get-user-by-token");

// cria uma nova festa
// POST /api/party -> valida o token, recebe as fotos do campo "photos" e cria a festa
router.post("/", verifyToken, upload.fields([{name: "photos"}]), async (req, res) => {

  // dados da requisição
  const title = req.body.title;
  const description = req.body.description;
  // a data chega com o nome party_date
  const partyDate = req.body.party_date;

  // lista dos arquivos recebidos
  let files = [];

  // com upload.fields, os arquivos ficam em req.files.<nome do campo>
  if(req.files) {
    files = req.files.photos;
  }

  // validações
  // o front-end envia FormData; campos vazios chegam como o texto "null"
  if(title == "null" || description == "null" || partyDate == "null") {
    return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data." });
  }

  // verifica o usuário
  // token do cabeçalho
  const token = req.header("auth-token");

  // usuário dono do token
  const userByToken = await getUserByToken(token);
  
  // id como texto
  const userId = userByToken._id.toString(); 

  // confirma no banco que o usuário existe
  const user = await User.findOne({ _id: userId });

  // não existe
  if (!user) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }

  // cria o array de fotos com o caminho de cada arquivo
  let photos = [];

  // se vieram arquivos
  if(files && files.length > 0) {    

    // guarda o caminho (ex.: public/img/123.jpg) de cada foto
    files.forEach((photo, i) => {
      photos[i] = photo.path;
    });

  }

  // nova festa (ainda não salva)
  const party = new Party({
    title: title,
    description: description,
    partyDate: partyDate,
    photos: photos,
    // true = privada
    privacy: req.body.privacy,
    // dono = usuário do token
    userId: userId
  });

  // tenta executar
  try {      

      // salva no banco
      const newParty = await party.save();
      res.json({ error: null, msg: "Evento criado com sucesso!", data: newParty });

  // erro
  } catch (error) {

      res.status(400).json({ error })
      
  }

});

// busca todas as festas públicas
// GET /api/party/all
router.get("/all", async (req, res) => {

  // tenta executar
  try {      

    // só as públicas; ordena pelo _id decrescente (as mais novas primeiro)
    const parties = await Party.find({ privacy: false }).sort([['_id', -1]]);
    res.json({ error: null, parties: parties });

  // erro
  } catch (error) {

    res.status(400).json({ error })
      
  }

});

// busca as festas do usuário
// GET /api/party/userparties
router.get("/userparties", verifyToken, async function (req, res) {

  // tenta executar
  try {      

    // token do cabeçalho
    const token = req.header("auth-token");

    // usuário dono do token
    const user = await getUserByToken(token);
    
    // id como texto
    const userId = user._id.toString();

    // festas cujo dono é o usuário logado
    const parties = await Party.find({ userId: userId });
    res.json({ error: null, parties: parties });

  // erro
  } catch (error) {

    res.status(400).json({ error })
      
  }

});

// busca uma festa do usuário
// GET /api/party/userparty/:id
router.get("/userparty/:id", verifyToken, async function (req, res) {

  // tenta executar
  try {      

    // token do cabeçalho
    const token = req.header("auth-token");

    // usuário dono do token
    const user = await getUserByToken(token);
    
    // id como texto
    const userId = user._id.toString();
    const partyId = req.params.id;

    // só encontra se a festa for do usuário logado
    const party = await Party.findOne({ _id: partyId, userId: userId });

    console.log(party)

    res.json({ error: null, party: party });

  // erro
  } catch (error) {

    res.status(400).json({ error })
      
  }

});

// busca uma festa (pública ou privada)
// GET /api/party/:id
router.get("/:id", async (req, res) => {

  // procura a festa
  const id = req.params.id;

  const party = await Party.findOne({ _id: id });

  // não existe (atenção: falta "return"; o código continua e party.privacy derruba a requisição)
  if(party === null) {
    res.json({ error: null, msg: "Este evento não existe!" });
  }

  // festa pública: qualquer um vê
  if(party.privacy === false) {

    res.json({ error: null, party: party });

  // festa privada: só o dono vê
  } else {

    // token do cabeçalho
    const token = req.header("auth-token");

    // usuário dono do token
    const user = await getUserByToken(token);
    
    // id como texto
    const userId = user._id.toString();
    const partyUserId = party.userId.toString();

    // verifica se o usuário pode acessar o evento
    if(userId == partyUserId) {
      res.json({ error: null, party: party });
    } else {
      res.status(401).json({ error: "Acesso negado!" });
    }

  }  

});

// remove uma festa
// DELETE /api/party (o id vai no corpo)
router.delete("/", verifyToken, async (req, res) => {

  // token do cabeçalho
  const token = req.header("auth-token");
  // usuário dono do token
  const user = await getUserByToken(token);
  // id da festa enviado no corpo
  const partyId = req.body.id;
  // id do usuário como texto
  const userId = user._id.toString();

  // tenta executar
  try {      

    // só remove se a festa for do usuário logado
    await Party.deleteOne({ _id: partyId, userId: userId });
    res.json({ error: null, msg: "Evento removido com sucesso!" });

  // erro
  } catch (error) {

    res.status(400).json({ error })
      
  }

});

// atualiza uma festa
// PUT /api/party
router.put("/", verifyToken, upload.fields([{name: "photos"}]), async (req, res) => {

  console.log(req.body);

  // dados da requisição
  const title = req.body.title;
  const description = req.body.description;
  const partyDate = req.body.partyDate;
  // id da festa
  const partyId = req.body.id;
  // id do dono, enviado pelo front-end (atenção: deveria vir do token, não do corpo)
  const partyUserId = req.body.user_id;

  // lista dos arquivos recebidos
  let files = [];

  // com upload.fields, os arquivos ficam em req.files.<nome do campo>
  if(req.files) {
    files = req.files.photos;
  }

  // validações
  // o front-end envia FormData; campos vazios chegam como o texto "null"
  if(title == "null" || description == "null" || partyDate == "null") {
    return res.status(400).json({ error: "Preencha pelo menos nome, descrição e data." });
  }

  // verifica o usuário
  // token do cabeçalho
  const token = req.header("auth-token");

  // usuário dono do token
  const userByToken = await getUserByToken(token);
  
  // id como texto
  const userId = userByToken._id.toString(); 

  // confirma no banco que o usuário existe
  const user = await User.findOne({ _id: userId });

  // não existe
  if (!user) {
    return res.status(400).json({ error: "O usuário não existe!" });
  }

  // monta o objeto com os novos dados
  const party = {
    id: partyId,
    title: title,
    description: description,
    partyDate: partyDate,
    privacy: req.body.privacy,
    userId: partyUserId
  }; 

  // cria o array de fotos com o caminho de cada arquivo
  let photos = [];

  // se vieram arquivos
  if(files && files.length > 0) {    

    // guarda o caminho (ex.: public/img/123.jpg) de cada foto
    files.forEach((photo, i) => {
      photos[i] = photo.path;
    });

    // só substitui as fotos se novas foram enviadas
    party.photos = photos;

  }
  
  // tenta executar
  try {      

    // retorna os dados atualizados ({ new: true })
    const updatedParty = await Party.findOneAndUpdate({ _id: partyId, userId: partyUserId }, { $set: party }, {new: true});
    res.json({ error: null, msg: "Evento atualizado com sucesso!", data: updatedParty });

  // erro
  } catch (error) {

    res.status(400).json({ error })
      
  }

});

// exporta o roteador
module.exports = router;