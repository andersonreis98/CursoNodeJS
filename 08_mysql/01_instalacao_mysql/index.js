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

app.get('/', (req, res) => {
    res.render('home');
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