const express = require('express');
const { engine } = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');
const Address = require('./models/Address');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/users/edit/:id', async (req, res) => {
	const id = req.params.id;
	const user = await User.findOne({ raw: true, where: { id: id } });
	res.render('useredit', { user });
});


app.get('/users/create', (req, res) => {
	res.render('adduser');
});

app.post('/users/create', async (req, res) => {
	const name = req.body.name;
	const occupation = req.body.occupation;
	let newsletter = req.body.newsletter;
	if (newsletter === 'on') {
		newsletter = true;
	} else {
		newsletter = false;
	}

	console.log(req.body);

	await User.create({ name, occupation, newsletter });

	res.redirect('/');
});
app.get('/users/:id', async (req,res)=>{
	const id = req.params.id
	const user = await User.findOne({raw: true, where:{id:id}})
	res.render('userview',{user})
})
app.post('/users/delete/:id', async (req,res)=>{
	const id = req.params.id
	await User.destroy({where:{id:id}})

	res.redirect('/')
})

app.post('/users/update', async (req,res)=>{

	const id = req.body.id
	const name = req.body.name
	const occupation = req.body.occupation
	let newsletter = req.body.newsletter

	if(newsletter === 'on'){
		newsletter = true
	}else{
		newsletter = false
	}

	const userData = {
		id,
		name,
		occupation,
		newsletter
	}

	await User.update(userData,{where:{id:id}})

	res.redirect('/')
})


app.post('/address/create', function (req, res) {
	const UserId = req.body.UserId
	const street = req.body.street
	const number = req.body.number
	const city = req.body.city
	
	const address = {
		street,
		number,
		city,
		UserId,
	}
	
	Address.create(address)
    .then(res.redirect(`/users/edit/${UserId}`))
    .catch((err) => console.log(err))
})

app.get('/', async (req, res) => {
	
	const users = await User.findAll({raw:true})

	console.log(users)

	res.render('home',{users});
});

conn
.sync()
// .sync({force:true})//Limpa a tabela e recria ela do zero, cuidado com essa opção
	.then(() => {
		app.listen(3000, () => {
			console.log('Servidor iniciado em http://localhost:3000');
		});
	})
	.catch(erro => console.log(erro));
