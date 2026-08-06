const express = require('express')
const app = express()
const port = 3000

// req o que recebe e res o que envia
app.get("/",(req,res)=>{

    res.send("Olá Mundo");

})

app.listen(port, () => {
  console.log('Servidor rodando na porta 3000')
})