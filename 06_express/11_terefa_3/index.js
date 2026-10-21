// importa o Express
const express = require('express');
// cria a aplicação
const app = express();
// porta do servidor
const port = 5000;

// módulo nativo para montar caminhos
const path = require('path');

// importa os roteadores de cada página
const sobre = require('./routes/sobre');
const home = require('./routes/home');

// libera a pasta public usando caminho absoluto (funciona de qualquer pasta onde o node for executado)
app.use(express.static(path.join(__dirname, 'public')));

// caminho da pasta templates (não usado neste arquivo; cada rota define o seu)
const basePath = path.join(__dirname, 'templates');

// rotas de /sobre
app.use("/sobre",sobre)
// rotas da raiz
app.use("/",home)

// inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 
