const express = require('express');
const app = express();
const port = 3001;

const path = require('path');

const users = require('./users');

// ler o body da requisição
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(express.json());

//arquivos estaticos
app.use(express.static('public'));

const basePath = path.join(__dirname, 'templates');

app.use("/users", users);

app.get('/', (req, res) => {
	res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
	console.log('Servidor rodando na porta 3001');
});
