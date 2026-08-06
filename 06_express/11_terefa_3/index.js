const express = require('express');
const app = express();
const port = 5000;

const path = require('path');

const sobre = require('./routes/sobre');
const home = require('./routes/home');

app.use(express.static(path.join(__dirname, 'public')));

const basePath = path.join(__dirname, 'templates');

app.use("/sobre",sobre)
app.use("/",home)

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
}); 