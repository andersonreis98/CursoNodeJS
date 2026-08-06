const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const hbs = exphbs.create({
	partialsDir: ['views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const auth = true;
const approved = true;
app.get('/', (req, res) => {
	const user = {
		name: 'Anderson',
		surname: 'Reis',
		age: 25,
	};
	const palavra = 'teste';

	res.render('home', { user: user, palavra: palavra, auth: auth, approved: approved });
});

app.get('/blog', (req, res) => {
	const posts = [
		{
			title: 'Meu Post 1',
			category: 'Categoria do Post 1',
			body: 'Este é o conteúdo do meu post 1',
			comments: 4,
		},
		{
			title: 'Meu Post 2',
			category: 'Categoria do Post 2',
			body: 'Este é o conteúdo do meu post 2',
			comments: 6,
		},
		{
			title: 'Meu Post 3',
			category: 'Categoria do Post 3',
			body: 'Este é o conteúdo do meu post 3',
			comments: 2,
		},
	];
	res.render('blog', { posts: posts });
});

app.get('/dashboard', (req, res) => {

	const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
	res.render('dashboard', { items: items });
});
app.get('/post', (req, res) => {
	// Handle post route
	const post = {
		title: 'Meu Post',
		category: 'Categoria do Post',
		body: 'Este é o conteúdo do meu post',
		comments: 4,
	};
	res.render('blogpost', { post: post });
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
