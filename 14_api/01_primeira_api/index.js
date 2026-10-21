// importa o Express, framework para criar servidores e APIs
const express = require('express');
// cria a aplicação
const app = express();

// middleware que lê dados enviados por formulários HTML (application/x-www-form-urlencoded)
app.use(
	express.urlencoded({
		// extended: true permite objetos e arrays aninhados nos dados
		extended: true,
	})
);

// middleware que lê o corpo das requisições em JSON e coloca em req.body
app.use(express.json());

// linha repetida: registra o mesmo middleware de JSON uma segunda vez (pode ser removida)
app.use(express.json());

// rotas - endpoints
// rota GET na raiz: responde com status 200 e um JSON
app.get('/', (req, res) => {
	res.status(200).json({ message: 'Hello World!' });
});

// rota post
// rota POST que recebe os dados de um produto
app.post('/createproduct', (req, res) => {
	// desestruturação: pega name e price de dentro de req.body
	const { name, price } = req.body;

	// mostra os dados recebidos no terminal
	console.log(name, price);

	// validação: se faltar algum campo, responde com erro
	if (!name || !price) {
		// 422 = Unprocessable Entity (dados inválidos)
		res.status(422).json({ message: 'Preencha todos os campos!' });
		// return impede que o código continue e tente responder duas vezes
		return;
	}

	// 201 = Created (recurso criado com sucesso)
	res.status(201).json({
		message: `O Produto ${name} com preço ${price} foi cadastrado com sucesso!`,
	});
});

// inicia o servidor na porta 3000
app.listen(3000, () => {
	// mensagem exibida quando o servidor sobe
	console.log('Server is running on port 3000');
});
