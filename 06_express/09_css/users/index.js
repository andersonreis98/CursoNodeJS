// importa o Express
const express = require('express');
// Router cria um "mini app" só com rotas, que depois é ligado ao app principal
const router = express.Router();
// módulo nativo para montar caminhos
const path = require('path');

// "../templates" sobe uma pasta, porque este arquivo está dentro de users/
const basePath = path.join(__dirname, '../templates');

// GET /users/add -> mostra o formulário
router.get('/add', (req, res) => {
	res.sendFile(`${basePath}/userForm.html`);
});

// POST /users/save -> recebe os dados do formulário
router.post('/save', (req, res) => {
	// todos os dados enviados
	console.log(req.body);
	// valores de cada campo (pelo atributo "name" dos inputs)
	const name = req.body.name;
	const age = req.body.age;

	console.log(`O nome do usuário é ${name} e ele tem ${age} anos.`);

	// mostra o formulário de novo
	res.sendFile(`${basePath}/userForm.html`);
});

// req o que recebe e res o que envia
// GET /users/:id -> rota dinâmica; fica por último para não capturar "/add"
router.get('/:id', (req, res) => {
	const id = req.params.id;

	console.log(`Estamos buscando pelo úsuario: ${id}`);

	res.sendFile(`${basePath}/userForm.html`);
});

// exporta o roteador para ser usado com app.use("/users", users)
module.exports = router;
