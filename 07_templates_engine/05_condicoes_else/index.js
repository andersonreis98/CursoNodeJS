// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();

// registra e define o Handlebars como engine das views
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// simula usuário autenticado
const auth = true;
// simula cadastro aprovado
const approved = true;
// rota da página inicial
app.get('/', (req, res) => {
	// dados do usuário
	const user = {
		name: 'Anderson',
		surname: 'Reis',
        age: 25,
	};
	const palavra = 'teste';

	// envia as flags auth e approved para a view usar no if/else
	res.render('home', { user: user, palavra: palavra, auth: auth, approved: approved });
});
// rota do painel
app.get('/dashboard', (req, res) => {

	// precisa estar autenticado E aprovado
	if (auth && approved) {
		res.render('dashboard');
	} else {
		res.redirect('/');
	}
});

// inicia o servidor
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

