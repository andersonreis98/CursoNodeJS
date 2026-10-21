// módulo nativo para criar servidores HTTP
const http = require('http');
// porta em que o servidor vai escutar (acesse http://localhost:3000)
const port = 3000;

// createServer recebe uma função executada a cada requisição: req = requisição, res = resposta
const server = http.createServer((req, res) => {
    // escreve um texto no corpo da resposta
    res.write('oi http');
    // finaliza a resposta e a envia ao navegador
    res.end();
});

// coloca o servidor para escutar na porta definida
server.listen(port, () => {
    // executado quando o servidor estiver pronto
    console.log(`Servidor rodando na porta ${port}`);
});
