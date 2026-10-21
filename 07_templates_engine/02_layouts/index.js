// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();

// registra o Handlebars como engine de templates
app.engine('handlebars', exphbs.engine());
// define .handlebars como extensão padrão das views
app.set('view engine', 'handlebars');

// rota da página inicial
app.get('/', (req, res) => {
    // renderiza views/home.handlebars dentro do layout padrão views/layouts/main.handlebars
    res.render('home');
});

// inicia o servidor
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
