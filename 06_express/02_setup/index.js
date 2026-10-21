// importa o Express
const express = require('express')
// cria a aplicação Express
const app = express()
// porta do servidor
const port = 3000

// req o que recebe e res o que envia
// rota GET para "/" (página inicial)
app.get("/",(req,res)=>{

    // res.send envia uma resposta de texto/HTML ao navegador
    res.send("Olá Mundo");

})

// inicia o servidor na porta definida
app.listen(port, () => {
  console.log('Servidor rodando na porta 3000')
})
