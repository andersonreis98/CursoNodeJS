// importa o Express, framework para criar o servidor e as rotas
const express = require('express')
// importa o express-handlebars, template engine que gera o HTML das views
const exphbs = require('express-handlebars')

// importa a conexão com o banco de dados (arquivo db/conn.js)
const pool = require('./db/conn')

// mostra pool no terminal (útil para depurar)
console.log(pool)

// cria a aplicação Express
const app = express()

// registra o Handlebars como engine (sintaxe antiga: nas versões novas use exphbs.engine())
app.engine('handlebars', exphbs())
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

// rota GET da página inicial
app.get('/', function (req, res) {
  // renderiza a view views/home.handlebars
  res.render('home')
})

// rota POST /books/insertbook: recebe dados enviados (formulário ou JSON)
app.post('/books/insertbook', function (req, res) {
  // valor do campo "title" enviado no corpo da requisição
  const title = req.body.title
  // valor do campo "pageqty" enviado no corpo da requisição
  const pageqty = req.body.pageqty

  // comando SQL de inserção; cada "?" será substituído pelos valores do array (evita SQL injection)
  const query = `INSERT INTO books (TITLE, PAGEQTY) VALUES (?, ?)`

  // executa o SQL passando os valores que substituem os "?"
  pool.query(query, [title, pageqty], function (err) {
    // se ocorreu erro, trata aqui
    if (err) {
      // mostra o erro no terminal
      console.log(err)
    }

    // redireciona o navegador para /
    res.redirect('/')
  })
})

// rota GET /books
app.get('/books', function (req, res) {
  // comando SQL que busca todos os registros da tabela
  const query = `SELECT * FROM books`

  // mensagem de teste no terminal
  console.log('TEste')

  // executa o SQL; o callback recebe (erro, resultado)
  pool.query(query, function (err, data) {
    // se ocorreu erro, trata aqui
    if (err) {
      // mostra o erro no terminal
      console.log(err)
    }

    // data é o array de registros retornado pelo banco
    const books = data

    // mostra data no terminal (útil para depurar)
    console.log(data)

    // renderiza a view books enviando { books } para o template
    res.render('books', { books })
  })
})

// rota GET /books/:id (o que vem depois de ":" é um parâmetro dinâmico, lido em req.params)
app.get('/books/:id', function (req, res) {
  // parâmetro "id" vindo da URL
  const id = req.params.id

  // busca um registro pelo id; atenção: inserir ${id} direto no SQL permite SQL injection (prefira "?")
  const query = `SELECT * FROM books WHERE ID = ${id}`

  // executa o SQL; o callback recebe (erro, resultado)
  pool.query(query, function (err, data) {
    // se ocorreu erro, trata aqui
    if (err) {
      // mostra o erro no terminal
      console.log(err)
    }

    // o resultado é sempre um array; [0] pega o primeiro (e único) registro
    const book = data[0]

    // mostra o registro encontrado no terminal
    console.log(data[0])

    // renderiza a view book enviando { book } para o template
    res.render('book', { book })
  })
})

// rota GET /books/edit/:id (o que vem depois de ":" é um parâmetro dinâmico, lido em req.params)
app.get('/books/edit/:id', function (req, res) {
  // parâmetro "id" vindo da URL
  const id = req.params.id

  // busca um registro pelo id usando "?" (query preparada, mais segura)
  const query = `SELECT * FROM books WHERE ID = ?`

  // executa o SQL passando os valores que substituem os "?"
  pool.query(query, [id], function (err, data) {
    // se ocorreu erro, trata aqui
    if (err) {
      // mostra o erro no terminal
      console.log(err)
    }

    // o resultado é sempre um array; [0] pega o primeiro (e único) registro
    const book = data[0]

    // mostra o registro encontrado no terminal
    console.log(data[0])

    // renderiza a view editbook enviando { book } para o template
    res.render('editbook', { book })
  })
})

// rota POST /books/updatebook: recebe dados enviados (formulário ou JSON)
app.post('/books/updatebook', function (req, res) {
  // valor do campo "id" enviado no corpo da requisição
  const id = req.body.id
  // valor do campo "title" enviado no corpo da requisição
  const title = req.body.title
  // valor do campo "pageqty" enviado no corpo da requisição
  const pageqty = req.body.pageqty

  // comando SQL de atualização com "?" (valores passados no array, de forma segura)
  const query = `UPDATE books SET TITLE = ?, PAGEQTY = ? WHERE ID = ?`

  // executa o SQL passando os valores que substituem os "?"
  pool.query(query, [title, pageqty, id], function (err) {
    // se ocorreu erro, trata aqui
    if (err) {
      // mostra o erro no terminal
      console.log(err)
    }

    // redireciona o navegador para /books/
    res.redirect(`/books/`)
  })
})

// rota POST /books/remove/:id: recebe dados enviados (formulário ou JSON)
app.post('/books/remove/:id', function (req, res) {
  // parâmetro "id" vindo da URL
  const id = req.params.id

  // comando SQL que remove o registro pelo id
  const query = `DELETE FROM books WHERE ID = ?`

  // executa o SQL passando os valores que substituem os "?"
  pool.query(query, [id], function (err) {
    // se ocorreu erro, trata aqui
    if (err) {
      // mostra o erro no terminal
      console.log(err)
    }

    // redireciona o navegador para /books
    res.redirect(`/books`)
  })
})

// inicia o servidor na porta 3000
app.listen(3000)
