const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

const auth = true;
app.get('/', (req, res) => {
	const user = {
		name: 'Anderson',
		surname: 'Reis',
        age: 25,
	};
	const palavra = 'teste';

	res.render('home', { user: user, palavra: palavra, auth: auth });
});
app.get('/dashboard', (req, res) => {

	if (auth) {
		res.render('dashboard');
	} else {
		res.redirect('/');
	}
});

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});
