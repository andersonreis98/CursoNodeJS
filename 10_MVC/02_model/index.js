// importa o Express, framework para criar o servidor e as rotas
const express = require('express');
// importa o express-handlebars, template engine que gera o HTML das views
const exphbs = require('express-handlebars');
// cria a aplicação Express
const app = express();

// importa a conexão com o banco de dados (arquivo db/conn.js)
const conn = require('./db/conn');
// importa o model Task, que representa a tabela/coleção no banco
const Task = require('./models/Task');

// registra o Handlebars como engine para arquivos .handlebars
app.engine('handlebars', exphbs.engine());
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

// sync cria as tabelas que ainda não existem, com base nos models
conn.sync()
	// executa quando a Promise anterior terminar com sucesso
	.then(() => {
		// inicia o servidor na porta 3000
		app.listen(3000);
		// mensagem exibida quando o servidor sobe
		console.log('Servidor iniciado em http://localhost:3000');
	})
	// trata o erro caso a Promise falhe
	.catch(err => {
		// mostra o erro no terminal
		console.log(err);
	});
