const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();
const hbs = exphbs.create({
    partialsDir: ['views/partials'],
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (req, res) => {
    res.render('home');
});
app.post('/books/insertbook', (req, res) => {
    const { title, pagesqty } = req.body;
    const query = 'INSERT INTO books (title, pageqty) VALUES (?, ?)';
    conn.query(query, [title, pagesqty], (err, result) => {
        if (err) {
            console.error('Erro ao inserir livro:', err);
            return;
        }
        res.redirect('/books')
    });
});

app.get('/books',(req,res)=>{
    const query = "select * from books";

    conn.query(query,function(err,data){
        if(err){
            console.log(err)
            return
        }
        const books = data
        console.log(books)
        res.render('books',{books})
    })
});

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql',
});

conn.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});