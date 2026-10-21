# Análise dos projetos do curso de Node.js

Este relatório lista os problemas encontrados ao revisar todos os projetos do curso.
O código **não foi alterado**: nos arquivos, só foram adicionados comentários (e os comentários em inglês foram traduzidos).
A maioria destes problemas também está marcada no próprio código, com um comentário que contém **"atenção:"**. Para encontrar todos, pesquise por `atenção:` no VS Code (Ctrl+Shift+F).

Legenda: 🔴 erro que quebra ou causa comportamento errado · 🟠 risco de segurança · 🟡 código desnecessário, legado ou desatualizado

---

## Padrões que se repetem (vale estudar)

1. **Falta de `return` depois de responder.** Depois de `res.status(...).json(...)` sem `return`, a função continua e tenta responder de novo. O resultado é o erro *"Cannot set headers after they are sent"*. Aparece em vários projetos (05, 15, 16).
2. **Promise usada do jeito errado.** `.then(res.redirect('/'))` executa o redirect **na hora**, sem esperar a operação. O correto é `.then(() => res.redirect('/'))`. Já `res.redirect(...).catch(...)` gera erro, porque `redirect` não retorna Promise.
3. **Operação no banco sem `await`** antes de redirecionar. O usuário pode voltar para a lista antes de o dado ser salvo, e os erros não são tratados.
4. **Erro tratado só com `console.log`.** A requisição fica sem resposta (o navegador fica carregando) ou o código continua com dados `undefined` e derruba o servidor.
5. **Busca sem verificar se encontrou algo.** `findOne`/`findById` pode retornar `null`, e logo depois o código acessa uma propriedade, por exemplo `user.get()` ou `party.privacy`.
6. **Segredos fixos no código** (`"nossosecret"`, `"nosso_secret"`, usuário/senha do banco). O certo é usar `.env` com `dotenv`, como na aula `17_mongodb_atlas/2_dotenv`.
7. **APIs que mudaram nas versões novas**: `exphbs()` virou `exphbs.engine()`; `url.parse()` virou `new URL()`; callbacks do Mongoose foram removidos na versão 7; `findByIdAndRemove` foi removido na versão 8; `ReactDOM.render` virou `createRoot`; `Switch`/`useHistory` viraram `Routes`/`useNavigate`.

---

## Por projeto

### 03_core_modules
- 🔴 `10_roteamento/index.js`: se o `.html` pedido não existir, o servidor nunca responde e a requisição fica pendurada.
- 🟡 Aulas 04 a 10: `url.parse()` é uma API legada. Hoje se usa `new URL(req.url, 'http://localhost')`.

### 05_accounts
- 🔴 `gerarConta()`: quando a conta já existe, falta `return`. A conta existente é sobrescrita com saldo 0 e o menu abre duas vezes.
- 🔴 `removeConta()`: compara o saldo (número) com a quantia (texto) sem `parseFloat` e aceita valores negativos.
- 🟡 `writeFileSync` recebe um callback que nunca é chamado, porque a função é síncrona.

### 07_templates_engine
- 🔴 Layouts das aulas 02 a 09: `<nav>Barra de navegacao</p>` tem um `</p>` sem a abertura `<p>`.
- 🔴 `09_css`: o CSS com caminho relativo `./css/styles.css` quebra em rotas aninhadas. Prefira `/css/styles.css`.
- 🟡 `10_tarefa_04`: `/product/:id` com um id inexistente mostra uma página vazia em vez de 404.

### 08_mysql
- 🔴 `07_excluindo_dados`: o botão Excluir envia POST para `/books/remove/:id`, mas essa rota não existe no `index.js` (*Cannot POST*). Ela só aparece no `8_connection_pool`.
- 🟠 Aulas 04 a 07 e `8_connection_pool`: o SQL é montado com `${id}`/`${title}` direto na string, o que permite **SQL injection**. O `9_preparando_query` corrige usando `?`.
- 🔴 Aulas 01 a 07: no erro do query, o código faz `return` sem responder. Nas aulas 8 e 9, só faz `console.log` e continua, então `data[0]` derruba o servidor.
- 🔴 `05_edita_dados_1`: o formulário de edição envia para `/books/insertbook`, criando um livro novo (foi corrigido na aula 06).
- 🟡 `books.handlebars` (03 a 07): a tag `<spin>` não existe; o correto é `<span>`.
- 🟡 Aulas 8 e 9: `exphbs()` é a sintaxe antiga.

### 09_sequelize
- 🟡 Models: `required: true` não existe no Sequelize e é ignorado. O correto é `allowNull: false`.
- 🔴 Aulas 10 a 12: `.then(res.redirect(...))`, explicado no padrão 2 acima.
- 🔴 `/users/:id` e `/users/edit/:id`: um id inexistente faz `user.get()` quebrar.
- 🟡 `useredit.handlebars`: falta fechar a `</div>` do campo "occupation".

### 10_MVC
- 🔴 `TaskController.js`: `res.redirect('/tasks').catch(...)` gera um TypeError depois de cada redirect.
- 🔴 `db/conn.js`: `sequelize.authenticate()` sem `await` dentro do `try/catch`, então o `catch` nunca pega a falha de conexão.
- 🟡 Aula 11: a view usa `{{#if emptyTasks}}`, mas o controller nunca envia `emptyTasks`.
- 🟡 Layout sem `<!DOCTYPE html>`.

### 11_pensamentos
- 🟡 `updatePensamentoPost` envia `description`, mas o model não tem essa coluna.
- 🟡 `registerPost`: usa `req.flash` com `res.render`, sem redirect, então a mensagem só aparece na próxima página.
- 🟠 O secret da sessão está fixo no código.
- 🟡 `req.session.userid = user.id` aparece repetido.

### 12_mongodb e 13_mongoose
- 🟡 `require('./db/conn').run`: o `conn.js` exporta o client, então `.run` é `undefined` e a variável não serve para nada.
- 🟡 O controller se chama `ToughController`, um nome copiado de outro projeto.
- 🔴 12: `product.save()` sem `await` no `createProductPost`.
- 🟡 12: os arquivos `models/Produto.js` (e `01/models/Product.js`) estão vazios.

### 14_api
- 🟡 `express.json()` está registrado duas vezes.

### 15_getapet (backend)
- 🔴 `helpers/get-user-by-token.js` usa `res`, que não existe na função. Sem token, dá ReferenceError.
- 🔴 `/pets/mypets` não usa `verifyToken`.
- 🔴 `editUser`: quando as senhas não conferem, falta `return`, então a resposta é enviada duas vezes.
- 🔴 `if (!images)` nunca falha, porque `req.files` é um array. Além disso, o `updatePet` sem imagens novas apaga as antigas.
- 🔴 `schedule`/`concludeAdoption` não verificam se o pet existe. 🟠 O `concludeAdoption` também não verifica se o usuário é o dono.
- 🟠 O segredo do JWT está fixo e repetido em 3 arquivos.
- 🟠 `getUserById` devolve o hash da senha.
- 🟡 `findByIdAndRemove` não existe mais no Mongoose 8.

### 15_getapet (frontend React)
- 🔴 `MyPets.concludeAdoption` e `PetDetails.schedule`: `api.patch(url, { headers })` manda os headers como **corpo**, então o token não vai. O correto é `api.patch(url, {}, { headers })`.
- 🔴 `useAuth.authUser` não define `api.defaults.headers.Authorization` depois do login. Isso só acontece ao recarregar a página.
- 🟡 `await Object.keys(...).forEach(...)` retorna `undefined`, e o `formData.append('pet', undefined)` envia um campo inútil.
- 🟡 `ReactDOM.render` e React Router v5 são APIs antigas.

### 24_28_mongodb
- 🔴 `14_projeto_notes` e `17_mongodb_atlas`: insert/update/delete sem `await` antes do redirect. Um id inválido em `/notes/:id` deixa o navegador sem resposta.
- 🟡 `res.redirect('/', 301)` é uma assinatura antiga, e o terceiro argumento é ignorado.
- 🟡 `15_mongoose`: `findOne` com callback não funciona no Mongoose 7+.
- 🔴 `16_partytime/backend`:
  - `/register` valida com `=== null`, mas campos ausentes chegam como `undefined`, então a validação nunca dispara.
  - O `PUT /api/user` não tem `return` depois dos erros.
  - No `GET /api/party/:id`, uma festa inexistente derruba a requisição.
- 🟠 `16_partytime/backend`: o `PUT /api/party` usa o `user_id` enviado pelo front-end, então **qualquer usuário logado pode editar festas de outros**.
- 🟡 `16_partytime/backend`: `get-user-by-token.js` tem o mesmo problema do getapet, e as opções `useFindAndModify`/`useNewUrlParser` não existem mais.
- 🔴 `16_partytime/frontend`: no `Party.vue`, uma festa inexistente quebra a página. O `EditParty.vue` não converte `\` em `/` nas URLs das fotos.
- 🟡 `16_partytime/frontend`:
  - Os nomes dos componentes foram copiados: `DataTable` tem name "Footer", e `UserForm`/`PartyForm` têm name "RegisterForm".
  - O `DataTable` usa `this.$parent`.
  - A URL `http://localhost:3000` está fixa, apesar do proxy.
