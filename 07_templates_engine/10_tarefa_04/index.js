// importa o Express
const express = require('express');
// importa o express-handlebars
const exphbs = require('express-handlebars');

// cria a aplicação
const app = express();
// instância do Handlebars com a pasta de partials configurada
const hbs = exphbs.create({
	partialsDir: ['views/partials'],
});

// registra e define o Handlebars como engine das views
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public')); // Serve arquivos estáticos da pasta 'public' (CSS, imagens...)

// "banco de dados" em memória: um array de produtos
const products = [
	{
		id: '1',
		title: 'Livro',
		price: 12.9,
	},
	{
		id: '2',
		title: 'Cadeira',
		price: 200.99,
	},
	{
		id: '3',
		title: 'Lâmpada',
		price: 2.0,
	},
];

// página inicial: lista todos os produtos
app.get('/', (req, res) => {
	res.render('home', { products: products });
});

// página de um produto específico, ex.: /product/2
app.get('/product/:id', function (req, res) {
	// find retorna o primeiro produto cujo id é igual ao da URL (os dois são strings)
	const product = products.find((p) => p.id === req.params.id);

	// { product } é o mesmo que { product: product }
	res.render('product', { product });
});

// inicia o servidor na porta 3001
app.listen(3001, () => {
	console.log('Server is running on http://localhost:3001');
});

