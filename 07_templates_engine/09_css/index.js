// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();
// cria uma instância configurada do Handlebars
const hbs = exphbs.create({
	// pasta onde ficam os partials (pedaços de template reutilizáveis, usados com {{> nome}})
	partialsDir: ['views/partials'],
});

// registra a engine configurada (repare: hbs.engine sem parênteses)
app.engine('handlebars', hbs.engine);
// define o Handlebars como engine padrão das views
app.set('view engine', 'handlebars');
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public' (CSS, imagens...)

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

// rota do blog: lista de posts
app.get('/blog', (req, res) => {
	// array de objetos; cada um será exibido pelo partial "post"
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
	// envia a lista para a view blog
	res.render('blog', { posts: posts });
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
	// objeto do post, usado na view com {{#with post}}
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

