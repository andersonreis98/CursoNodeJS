// importa o Express, framework para criar o servidor e as rotas
const express = require('express');
// importa o express-handlebars, template engine que gera o HTML das views
const { engine } = require('express-handlebars');
// importa a conexão com o banco de dados (arquivo db/conn.js)
const conn = require('./db/conn');

// importa o model User, que representa a tabela/coleção no banco
const User = require('./models/User');
// importa o model Address, que representa a tabela/coleção no banco
const Address = require('./models/Address');

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

// rota GET /users/edit/:id (o que vem depois de ":" é um parâmetro dinâmico, lido em req.params)
app.get('/users/edit/:id', async (req, res) => {
	// parâmetro "id" vindo da URL
	const id = req.params.id;
	// busca um único registro de User; raw: true retorna um objeto simples
	const user = await User.findOne({ raw: true, where: { id: id } });
	// renderiza a view useredit enviando { user } para o template
	res.render('useredit', { user });
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
// rota GET /users/:id (o que vem depois de ":" é um parâmetro dinâmico, lido em req.params)
app.get('/users/:id', async (req,res)=>{
	// parâmetro "id" vindo da URL
	const id = req.params.id
	// busca um único registro de User; raw: true retorna um objeto simples
	const user = await User.findOne({raw: true, where:{id:id}})
	// renderiza a view userview enviando {user} para o template
	res.render('userview',{user})
})
// rota POST /users/delete/:id: recebe dados enviados (formulário ou JSON)
app.post('/users/delete/:id', async (req,res)=>{
	// parâmetro "id" vindo da URL
	const id = req.params.id
	// remove o registro de User que atende ao where (DELETE)
	await User.destroy({where:{id:id}})

	// redireciona o navegador para /
	res.redirect('/')
})

// rota POST /users/update: recebe dados enviados (formulário ou JSON)
app.post('/users/update', async (req,res)=>{

	// valor do campo "id" enviado no corpo da requisição
	const id = req.body.id
	// valor do campo "name" enviado no corpo da requisição
	const name = req.body.name
	// valor do campo "occupation" enviado no corpo da requisição
	const occupation = req.body.occupation
	// checkbox: chega "on" quando marcado e não chega (undefined) quando desmarcado
	let newsletter = req.body.newsletter

	// converte o valor do checkbox para booleano
	if(newsletter === 'on'){
		// marcado
		newsletter = true
	// caso contrário
	}else{
		// desmarcado
		newsletter = false
	}

	// monta o objeto userData
	const userData = {
		// atalho de propriedade: id: id
		id,
		// atalho de propriedade: name: name
		name,
		// atalho de propriedade: occupation: occupation
		occupation,
		// atalho de propriedade: newsletter: newsletter
		newsletter
	}

	// atualiza o registro de User que atende ao where (UPDATE)
	await User.update(userData,{where:{id:id}})

	// redireciona o navegador para /
	res.redirect('/')
})


// rota POST /address/create: recebe dados enviados (formulário ou JSON)
app.post('/address/create', function (req, res) {
	// valor do campo "UserId" enviado no corpo da requisição
	const UserId = req.body.UserId
	// valor do campo "street" enviado no corpo da requisição
	const street = req.body.street
	// valor do campo "number" enviado no corpo da requisição
	const number = req.body.number
	// valor do campo "city" enviado no corpo da requisição
	const city = req.body.city
	
	// monta o objeto address
	const address = {
		// atalho de propriedade: street: street
		street,
		// atalho de propriedade: number: number
		number,
		// atalho de propriedade: city: city
		city,
		// atalho de propriedade: UserId: UserId
		UserId,
	}
	
	// insere o registro no banco (retorna uma Promise)
	Address.create(address)
    // atenção: aqui o redirect é executado na hora (não espera a Promise); o correto seria .then(() => res.redirect(...))
    .then(res.redirect(`/users/edit/${UserId}`))
    // se der erro, mostra no terminal
    .catch((err) => console.log(err))
})

// rota GET da página inicial
app.get('/', async (req, res) => {
	
	// busca todos os registros de User; raw: true retorna objetos simples, que o Handlebars consegue ler
	const users = await User.findAll({raw:true})

	// mostra users no terminal (útil para depurar)
	console.log(users)

	// renderiza a view home enviando {users} para o template
	res.render('home',{users});
});

// conexão do Sequelize
conn
// sync cria as tabelas que ainda não existem, com base nos models
.sync()
// .sync({force:true})//Limpa a tabela e recria ela do zero, cuidado com essa opção
	.then(() => {
		// inicia o servidor e fica escutando requisições
		app.listen(3000, () => {
			// mensagem exibida quando o servidor sobe
			console.log('Servidor iniciado em http://localhost:3000');
		});
	})
	// se der erro, mostra no terminal
	.catch(erro => console.log(erro));
