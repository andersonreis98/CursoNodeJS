// importa o Express
const express = require('express');
// cria o roteador
const router = express.Router();
// módulo nativo para montar caminhos
const path = require('path');

// pasta templates (uma pasta acima de routes/)
const basePath = path.join(__dirname, '../templates');

// "/" aqui é relativo ao prefixo usado no app.use
router.get('/', (req, res) => {
    // envia a página index.html
    res.sendFile(`${basePath}/index.html`);
});

// exporta o roteador
module.exports = router;
