// importa o Express
const express = require('express');
// importa o express-handlebars, template engine que gera HTML com dados dinâmicos
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();

// registra o Handlebars como engine para arquivos .handlebars
app.engine('handlebars', exphbs.engine());
// define o Handlebars como engine padrão das views (pasta "views")
app.set('view engine', 'handlebars');

// rota da página inicial
app.get('/', (req, res) => {
    // render procura views/home.handlebars; layout: false = não usar o layout main
    res.render('home',{layout: false});
});

// inicia o servidor
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
