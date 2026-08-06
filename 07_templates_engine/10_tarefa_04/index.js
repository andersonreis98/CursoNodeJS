const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
const hbs = exphbs.create({
	partialsDir: ['views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public')); // Serve static files from the 'public' directory

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

app.get('/', (req, res) => {
	res.render('home', { products: products });
});

app.get('/product/:id', function (req, res) {
	const product = products.find((p) => p.id === req.params.id);

	res.render('product', { product });
});

app.listen(3001, () => {
	console.log('Server is running on http://localhost:3001');
});
