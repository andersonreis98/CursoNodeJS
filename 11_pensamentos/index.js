// importa o Express, framework para criar o servidor e as rotas
const express = require("express");
// importa o express-handlebars, template engine que gera o HTML das views
const exphbs = require("express-handlebars");
// importa o express-session, que guarda dados do usuário entre requisições (ex.: quem está logado)
const session = require("express-session");
// session-file-store salva as sessões em arquivos em vez da memória (não se perdem ao reiniciar)
const FileStore = require("session-file-store")(session);
// importa o express-flash, que mostra mensagens rápidas (flash) depois de um redirect
const flash = require("express-flash");

// cria a aplicação Express
const app = express();

// importa a conexão com o banco (Sequelize)
const conn = require("./db/conn");

// Models
// importa o model Pensamento (ao importá-lo, o model User e o relacionamento também são carregados)
const Pensamento = require("./models/Pensamento");

// rotas
// rotas dos pensamentos (/Pensamentos/...)
const PensamentosRoutes = require("./routes/PensamentosRoutes");
// rotas de autenticação (/login, /register, /logout)
const authRoutes = require("./routes/authRoutes");
// controller usado diretamente na rota "/"
const PensamentosController = require("./controllers/PensamentosController");

// registra o Handlebars como engine (sintaxe antiga: nas versões novas use exphbs.engine())
app.engine("handlebars", exphbs());
// define o Handlebars como engine padrão das views
app.set("view engine", "handlebars");

// middleware que lê dados de formulários e coloca em req.body
app.use(
  express.urlencoded({
    // permite objetos e arrays aninhados
    extended: true,
  })
);

// middleware que lê corpos em JSON e coloca em req.body
app.use(express.json());

// middleware de sessão
app.use(
  session({
    // nome do cookie de sessão no navegador
    name: 'session',
    // chave usada para assinar o cookie (em produção deve ficar em variável de ambiente)
    secret: 'nosso_secret',
    // não salva a sessão de novo se ela não mudou
    resave: false,
    // não cria sessão para quem ainda não guardou nada nela
    saveUninitialized: false,
    // onde as sessões são guardadas
    store: new FileStore({
      // função vazia: desliga os logs do session-file-store
      logFn: function () {},
      // salva os arquivos de sessão na pasta temporária do sistema (/tmp/sessions no Linux)
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    // configurações do cookie
    cookie: {
      // false: funciona sem HTTPS (em produção com HTTPS deve ser true)
      secure: false,
      // validade do cookie: 3600000 ms = 1 hora
      maxAge: 3600000,
      // data de expiração (1 hora a partir de agora)
      expires: new Date(Date.now() + 3600000),
      // impede que o JavaScript do navegador leia o cookie (mais seguro)
      httpOnly: true,
    },
  }),
)

// mensagens flash
// habilita req.flash('message', '...') para mostrar mensagens na próxima página
app.use(flash());

// libera a pasta public (CSS, imagens)
app.use(express.static("public"));

// coloca a sessão em res (deixa disponível para as views)
app.use((req, res, next) => {
  // console.log(req.session)
  // mostra no terminal o id do usuário logado (undefined se ninguém estiver logado)
  console.log(req.session.userid);

  // se há usuário logado, res.locals.session fica disponível em TODAS as views
  // (usado no layout para mostrar ou esconder links como "Sair" e "Dashboard")
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  // segue para a próxima função/rota
  next();
});

// rotas de pensamentos com o prefixo /Pensamentos
app.use("/Pensamentos", PensamentosRoutes);
// rotas de autenticação na raiz
app.use("/", authRoutes);

// página inicial: lista todos os pensamentos
app.get("/", PensamentosController.showPensamentos);

// conexão do Sequelize
conn
// .sync({force: true})
// sync cria as tabelas que ainda não existem, com base nos models
.sync()
// quando as tabelas estiverem prontas, inicia o servidor
.then(() => {
    // servidor na porta 3000
    app.listen(3000);
  })
  // se der erro na sincronização, mostra no terminal
  .catch((err) => console.log(err));
