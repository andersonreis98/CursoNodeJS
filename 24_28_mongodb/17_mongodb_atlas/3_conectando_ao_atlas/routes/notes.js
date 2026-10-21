// pega a função Router do Express
const Router = require('express').Router;
// módulo de conexão com o banco
const db = require("../db/connection");
// ObjectId converte uma string no tipo de id do MongoDB
const {ObjectId} = require('mongodb');

// cria o roteador
const router = Router();

// Receber todas as notas
// GET /notes -> mostra o formulário de criação (apesar do comentário acima, não lista as notas)
router.get('/', function(req, res) {

  // renderiza views/notes/create.handlebars
  res.render('notes/create');

})

// View individual de detalhes da nota
// GET /notes/:id -> detalhes de uma nota
router.get('/:id', function(req, res) {

  // função assíncrona que se executa sozinha
  (async() => {

    // converte o id da URL em ObjectId (um id inválido lança erro, tratado no catch)
    const id = new ObjectId(req.params.id);

    // find devolve um array; [0] pega o primeiro (findOne faria o mesmo de forma mais direta)
    const note = (await db.getDb().db().collection('notes').find({ _id: id}).toArray())[0]
    
    // console.log(note) 

    // renderiza a página de detalhes
    res.render('notes/detail', {note});

  })()
    // erro: mostra no terminal (atenção: o navegador fica sem resposta)
    .catch(err => console.log(err))
  
});

// View de edição
// GET /notes/edit/:id -> formulário de edição
router.get('/edit/:id', function(req, res) {

  // função assíncrona que se executa sozinha
  (async() => {

    // id da URL convertido em ObjectId
    const id = new ObjectId(req.params.id);

    // busca a nota
    const note = (await db.getDb().db().collection('notes').find({ _id: id}).toArray())[0]
    
    // console.log(note) 

    // renderiza o formulário com os dados da nota
    res.render('notes/edit', {note});

  })()
    // erro: mostra no terminal
    .catch(err => console.log(err))
  
});

// Post de atualização de Nota
// POST /notes/update -> salva a edição
router.post('/update', function(req, res) {

  // dados do formulário
  const data = req.body;
  // id (campo escondido) convertido em ObjectId
  const id = new ObjectId(data.id);
  // novos valores
  const title = data.title;
  const desc = data.description;

  // atualiza a nota (sem await: o redirect abaixo não espera terminar)
  db.getDb()
    .db()
    .collection('notes')
    // $set altera só os campos informados
    .updateOne({_id: id}, { $set: { title: title, desc: desc } })
  
  // volta para a página inicial
  res.redirect('/');

});
  
// Post de criação de Nota
// POST /notes -> cria uma nota
router.post('', function(req, res) {

  // dados do formulário
  const data = req.body;
  const title = data.title;
  const desc = data.description;

  // insere a nota (sem await)
  db.getDb()
    .db()
    .collection('notes')
    .insertOne({title: title, desc: desc})

  // redireciona para a home (a forma res.redirect(url, status) é antiga; hoje é res.redirect(301, url))
  res.redirect('/', 301);

});

// Post de remoção de Nota
// POST /notes/delete -> remove uma nota
router.post('/delete', function(req, res) {

  // dados do formulário
  const data = req.body;
  // id da nota em ObjectId
  const id = new ObjectId(data.id);

  // remove a nota (sem await)
  db.getDb()
    .db()
    .collection('notes')
    .deleteOne({_id: id})

  // redireciona para a home (o terceiro argumento com a mensagem é ignorado pelo Express)
  res.redirect('/', 301, { msg: "Nota removida!"});

});

// exporta o roteador
module.exports = router;
