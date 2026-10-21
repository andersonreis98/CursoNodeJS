// importa o Express, framework para criar o servidor e as rotas
const express = require('express')
// importa o express-handlebars, template engine que gera o HTML das views
const exphbs = require('express-handlebars')
// cria a aplicação Express
const app = express()

// importa a conexão com o banco de dados (arquivo db/conn.js)
const conn = require('./db/conn').run

// importa o arquivo de rotas productsRoutes
const productsRoutes = require('./routes/productsRoutes')

// registra o Handlebars como engine para arquivos .handlebars
app.engine('handlebars', exphbs.engine())

// define o Handlebars como engine padrão das views (pasta views/)
app.set('view engine', 'handlebars')

// registra um middleware (função executada em todas as requisições)
app.use(
  // lê dados enviados por formulários HTML e coloca em req.body
  express.urlencoded({
    // extended: true permite objetos e arrays aninhados
    extended: true,
  }),
)

// middleware que lê corpos em JSON e coloca em req.body
app.use(express.json())

// libera a pasta public para o navegador (CSS, imagens, JS do front)
app.use(express.static('public'))

// liga as rotas de "productsRoutes" com o prefixo /
app.use('/', productsRoutes)

// inicia o servidor na porta 3000
app.listen(3000)
