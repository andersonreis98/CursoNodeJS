// importa o Express, framework para criar o servidor e as rotas
const express = require('express');
// importa o express-handlebars, template engine que gera o HTML das views
const { engine } = require('express-handlebars');
// importa a conexão com o banco de dados (arquivo db/conn.js)
const conn = require('./db/conn');

// importa o model User, que representa a tabela/coleção no banco
const User = require('./models/User');

// cria a aplicação Express
const app = express();

// registra o Handlebars como engine para arquivos .handlebars
app.engine('handlebars', engine());
// define o Handlebars como engine padrão das views (pasta views/)
app.set('view engine', 'handlebars');
// define a pasta onde ficam as views
app.set('views', './views');

// middleware que lê dados de formulários e coloca em req.body
app.use(express.urlencoded({ extended: true }));
// middleware que lê corpos em JSON e coloca em req.body
app.use(express.json());
// libera a pasta public para o navegador (CSS, imagens, JS do front)
app.use(express.static('public'));

// rota GET da página inicial
app.get('/', (req, res) => {
	// renderiza a view views/home.handlebars
	res.render('home');
});

// rota GET /users/create
app.get('/users/create', (req, res) => {
	// renderiza a view views/adduser.handlebars
	res.render('adduser');
});

// rota POST /users/create: recebe dados enviados (formulário ou JSON)
app.post('/users/create', async (req, res) => {
	// valor do campo "name" enviado no corpo da requisição
	const name = req.body.name;
	// valor do campo "occupation" enviado no corpo da requisição
	const occupation = req.body.occupation;
	// checkbox: chega "on" quando marcado e não chega (undefined) quando desmarcado
	let newsletter = req.body.newsletter;
	// converte o valor do checkbox para booleano
	if (newsletter === 'on') {
		// marcado
		newsletter = true;
	// caso contrário
	} else {
		// desmarcado
		newsletter = false;
	}

	// mostra no terminal os dados recebidos do formulário
	console.log(req.body);

	// insere um novo registro de User no banco (INSERT)
	await User.create({ name, occupation, newsletter });

	// redireciona o navegador para /
	res.redirect('/');
});

// sync cria as tabelas que ainda não existem, com base nos models
conn.sync()
	// executa quando a Promise anterior terminar com sucesso
	.then(() => {
		// inicia o servidor e fica escutando requisições
		app.listen(3000, () => {
			// mensagem exibida quando o servidor sobe
			console.log('Servidor iniciado em http://localhost:3000');
		});
	})
	// se der erro, mostra no terminal
	.catch(erro => console.log(erro));
