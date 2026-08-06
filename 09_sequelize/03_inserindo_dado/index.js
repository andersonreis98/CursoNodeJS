const express = require('express');
const { engine } = require('express-handlebars');
const conn = require('./db/conn');

const User = require('./models/User');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
	res.render('home');
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

conn.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log('Servidor iniciado em http://localhost:3000');
		});
	})
	.catch(erro => console.log(erro));
