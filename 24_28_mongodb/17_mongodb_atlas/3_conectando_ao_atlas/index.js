// Configurações
// carrega as variáveis do arquivo .env para process.env (precisa vir antes de usá-las)
require('dotenv').config()
// importa o Express
const express = require('express')
// importa o express-handlebars (template engine)
const exphbs = require('express-handlebars')
// body-parser lê os dados dos formulários (hoje o próprio Express faz isso com express.urlencoded)
const bodyParser = require('body-parser')

// importa as rotas de notas
const notesRoutes = require('./routes/notes')

// importa o módulo de conexão com o banco (initDb e getDb)
const db = require('./db/connection')

// cria a aplicação
const app = express()
// porta do servidor
const port = 8000

// registra o Handlebars (sintaxe antiga: nas versões novas use exphbs.engine())
app.engine('handlebars', exphbs())
// define o Handlebars como engine das views
app.set('view engine', 'handlebars')
// libera a pasta public (CSS)
app.use(express.static('public'))
// lê os dados enviados por formulários e coloca em req.body
app.use(bodyParser.urlencoded({ extended: true }))

// rotas de notas com o prefixo /notes
app.use('/notes', notesRoutes)

// Rotas
// página inicial: lista todas as notas
app.get('/', function (req, res) {
  // o ";" no início evita que o "(" seja interpretado como continuação da linha anterior
  // (função assíncrona que se executa sozinha, para usar await)
  ;(async () => {
    // busca todas as notas da coleção "notes"
    const notes = await db.getDb().db().collection('notes').find({}).toArray()

    // console.log(notes)

    // renderiza a home com a lista
    res.render('home', { notes })
  // se der erro, mostra no terminal
  })().catch((err) => console.log(err))
})

// conecta ao banco e, só depois, inicia o servidor
db.initDb((err, db) => {
  // falhou a conexão
  if (err) {
    console.log(err)
  } else {
    // conectou: inicia o servidor
    app.listen(port, () => {
      // lê uma variável definida no arquivo .env
      console.log(`Nossa variável de ambiente: ${process.env.MY_VARIABLE}`)
      console.log(`Projeto rodando na porta:${port}`)
    })
  }
})
