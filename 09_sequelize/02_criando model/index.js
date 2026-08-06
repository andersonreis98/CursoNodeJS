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

conn.sync()
	.then(() => {
		app.listen(3000, () => {
			console.log('Servidor iniciado em http://localhost:3000');
		});
	})
	.catch(erro => console.log(erro));
