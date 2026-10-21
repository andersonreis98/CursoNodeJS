// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();

// registra e define o Handlebars como engine das views
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// simula se o usuário está autenticado
const auth = true;
// rota da página inicial
app.get('/', (req, res) => {
	// dados do usuário
	const user = {
		name: 'Anderson',
		surname: 'Reis',
        age: 25,
	};
	const palavra = 'teste';

	// envia "auth" para a view usar no {{#if auth}}
	res.render('home', { user: user, palavra: palavra, auth: auth });
});
// rota do painel, protegida
app.get('/dashboard', (req, res) => {

	// só mostra o painel se estiver autenticado
	if (auth) {
		res.render('dashboard');
	} else {
		// caso contrário, volta para a página inicial
		res.redirect('/');
	}
});

// inicia o servidor
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

