// módulos
// importa o Express
const express = require("express");
// importa o Mongoose
const mongoose = require("mongoose");
// body-parser (importado, mas não usado: o express.json() já faz o trabalho)
const bodyParser = require("body-parser");
// cors libera o acesso da API pelo front-end Vue (outra porta)
const cors = require("cors");

// rotas
// autenticação (registro e login)
const authRouter = require("./routes/authRoutes.js");
// usuário
const userRouter = require("./routes/userRoutes.js");
// festas
const partyRouter = require("./routes/partyRoutes.js");

// middlewares
// middleware que valida o token JWT
const verifyToken = require("./helpers/check-token");

// configuração
// nome do banco (não usado: o nome está escrito direto na URL de conexão)
const dbName = "partytime";
// porta da API
const port = 3000;

// cria a aplicação
const app = express();

// libera o CORS para qualquer origem
app.use(cors())
// lê o corpo das requisições em JSON
app.use(express.json());
// libera a pasta public (fotos das festas)
app.use(express.static('public'));
// rotas de autenticação: /api/auth/...
app.use("/api/auth", authRouter);
// rotas de usuário: todas exigem token (verifyToken roda antes)
app.use("/api/user", verifyToken, userRouter);
// rotas de festas: /api/party/...
app.use("/api/party", partyRouter);

// conecta ao MongoDB local, no banco "partytime"
mongoose.connect(
  "mongodb://localhost/partytime",
  {
    // opções exigidas pelo Mongoose 5 (no Mongoose 6+ não existem mais)
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// rota de teste
app.get("/", (req, res) => {
  res.json({ message: "Rota teste." });
});

// inicia o servidor
app.listen(port, () => {
  console.log(`O backend está rodando na porta ${port}`);
});