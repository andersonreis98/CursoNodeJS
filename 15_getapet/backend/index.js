// importa o Express
const express = require('express')
// importa o cors, que permite que o front-end (outro endereço/porta) acesse esta API
const cors = require('cors')

// cria a aplicação
const app = express()

// Configura respostas e requisições em JSON
// lê o corpo das requisições em JSON e coloca em req.body
app.use(express.json())

// Resolve o CORS
// libera o acesso só para o front-end React em localhost:3000; credentials permite enviar cookies/headers de autenticação
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Pasta pública para as imagens
// as imagens enviadas ficam em public/images e são acessadas pela URL /images/...
app.use(express.static('public'))

// Rotas
// importa os arquivos de rotas
const PetRoutes = require('./routes/PetRoutes')
const UserRoutes = require('./routes/UserRoutes')

// rotas de pets com o prefixo /pets
app.use('/pets', PetRoutes)
// rotas de usuários com o prefixo /users
app.use('/users', UserRoutes)

// a API roda na porta 5000 (o React usa a 3000)
app.listen(5000)
