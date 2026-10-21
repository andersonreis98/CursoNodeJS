// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();

// registra e define o Handlebars como engine das views
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// rota da página inicial
app.get('/', (req, res) => {
    // texto simples enviado para a view
    const palavra = 'teste';
	// objeto com dados do usuário
	const user = {
		name: 'Anderson',
		surname: 'Reis',
        age: 25,
	};
	// o segundo argumento do render é o objeto com os dados que a view pode usar
	res.render('home', { user: user, palavra: palavra });
});

// inicia o servidor
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});

