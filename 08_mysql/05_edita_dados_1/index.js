// importa o Express, framework para criar o servidor e as rotas
const express = require('express');
// importa o express-handlebars, template engine que gera o HTML das views
const exphbs = require('express-handlebars');
// importa o driver do MySQL para o Node se comunicar com o banco
const mysql = require('mysql');

// cria a aplicação Express
const app = express();
// cria uma instância configurada do Handlebars
const hbs = exphbs.create({
    // pasta dos partials (pedaços de template reutilizáveis, usados com {> nome})
    partialsDir: ['views/partials'],
});
// registra a engine configurada acima
app.engine('handlebars', hbs.engine);
// define o Handlebars como engine padrão das views (pasta views/)
app.set('view engine', 'handlebars');

app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public' (CSS, imagens...)

app.use(express.urlencoded({ extended: true })); // Middleware que lê corpos de formulário (URL-encoded) e coloca em req.body

app.use(express.json()); // Middleware que lê corpos em JSON e coloca em req.body

// rota GET da página inicial
app.get('/', (req, res) => {
    // renderiza a view views/home.handlebars
    res.render('home');
});
// rota POST /books/insertbook: recebe dados enviados (formulário ou JSON)
app.post('/books/insertbook', (req, res) => {
    // desestruturação: pega title, pagesqty de dentro de req.body
    const { title, pagesqty } = req.body;
    // comando SQL de inserção; cada "?" será substituído pelos valores do array (evita SQL injection)
    const query = 'INSERT INTO books (title, pageqty) VALUES (?, ?)';
    // executa o SQL passando os valores que substituem os "?"
    conn.query(query, [title, pagesqty], (err, result) => {
        // se ocorreu erro, trata aqui
        if (err) {
            // mostra a mensagem e o erro no terminal
            console.error('Erro ao inserir livro:', err);
            // interrompe a função
            return;
        }
        // redireciona o navegador para /books
        res.redirect('/books')
    });
});

// rota GET /books
app.get('/books',(req,res)=>{
    // comando SQL que busca todos os registros da tabela
    const query = "select * from books";

    // executa o SQL; o callback recebe (erro, resultado)
    conn.query(query,function(err,data){
        // se ocorreu erro, trata aqui
        if(err){
            // mostra o erro no terminal
            console.log(err)
            // interrompe a função
            return
        }
        // data é o array de registros retornado pelo banco
        const books = data
        // mostra books no terminal (útil para depurar)
        console.log(books)
        // renderiza a view books enviando {books} para o template
        res.render('books',{books})
    })
});

// rota GET /books/:id (o que vem depois de ":" é um parâmetro dinâmico, lido em req.params)
app.get('/books/:id',(req,res)=>{
    // parâmetro "id" vindo da URL
    const id = req.params.id;
    // busca um registro pelo id; atenção: inserir ${id} direto no SQL permite SQL injection (prefira "?")
    const sql = `select * from books where id = ${id}`;
    // executa o SQL; o callback recebe (erro, resultado)
    conn.query(sql,function(err,data){
        // se ocorreu erro, trata aqui
        if(err){
            // mostra o erro no terminal
            console.log(err)
            // interrompe a função
            return
        }
        // o resultado é sempre um array; [0] pega o primeiro (e único) registro
        const book = data[0]
        // mostra book no terminal (útil para depurar)
        console.log(book)
        // renderiza a view book enviando {book} para o template
        res.render('book',{book})
    })
});

// rota GET /books/edit/:id (o que vem depois de ":" é um parâmetro dinâmico, lido em req.params)
app.get('/books/edit/:id', (req, res) => {
    // parâmetro "id" vindo da URL
    const id = req.params.id;
    // busca um registro pelo id; atenção: inserir ${id} direto no SQL permite SQL injection (prefira "?")
    const sql = `SELECT * FROM books WHERE id = ${id}`;
    // executa o SQL; o callback recebe (erro, resultado)
    conn.query(sql, (err, data) => {
        // se ocorreu erro, trata aqui
        if (err) {
            // mostra a mensagem e o erro no terminal
            console.error('Erro ao buscar livro para edição:', err);
            // interrompe a função
            return;
        }
        // o resultado é sempre um array; [0] pega o primeiro (e único) registro
        const book = data[0];
        // renderiza a view editbook enviando { book } para o template
        res.render('editbook', { book });
    });
});


// cria a conexão com o MySQL
const conn = mysql.createConnection({
    // endereço do servidor do banco
    host: 'localhost',
    // usuário do banco
    user: 'root',
    // senha do banco
    password: '',
    // nome do banco de dados
    database: 'nodemysql',
});

// abre a conexão; o callback recebe um erro se falhar
conn.connect((err) => {
    // se ocorreu erro, trata aqui
    if (err) {
        // mostra o erro de conexão
        console.error('Erro ao conectar ao banco de dados:', err);
        // interrompe a função
        return;
    }
    // confirma que conectou
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
});

// inicia o servidor e fica escutando requisições
app.listen(3000, () => {
    // mensagem exibida quando o servidor sobe
    console.log('Server is running on http://localhost:3000');
});