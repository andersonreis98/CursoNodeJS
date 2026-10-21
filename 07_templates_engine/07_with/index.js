// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();

// registra e define o Handlebars como engine das views
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// simula usuário autenticado e aprovado
const auth = true;
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

	// envia os dados para a view home
	res.render('home', { user: user, palavra: palavra, auth: auth, approved: approved });
});
// rota do painel
app.get('/dashboard', (req, res) => {

	// lista percorrida na view com each
	const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
	res.render('dashboard', { items: items });
});
// rota de um post
app.get('/post', (req, res) => {
	// Trata a rota do post
	// objeto do post; na view, {{#with post}} permite usar {{title}} em vez de {{post.title}}
	const post = {
		title: 'Meu Post',
		category: 'Categoria do Post',
		body: 'Este é o conteúdo do meu post',
		comments: 4,
	};
	res.render('blogpost', { post: post });
});

// inicia o servidor
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

