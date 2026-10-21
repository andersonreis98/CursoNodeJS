// 1 - conexao
// importa o Mongoose
const mongoose = require('mongoose');

// conecta ao banco "test" do MongoDB local (essas opções eram exigidas em versões antigas e hoje são ignoradas)
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

// objeto que representa a conexão
const db = mongoose.connection;

// se der erro de conexão, mostra no terminal (bind fixa o "this" do console.error)
db.on('error', console.error.bind(console, 'connection error:'));

// once: executa só na primeira vez que a conexão abrir
db.once('open', function() {
  console.log("Estamos conectados!")
});

// 2 - Criando um Schema

// o Schema define os campos e os tipos dos documentos
const pessoaSchema = new mongoose.Schema({
    // campo texto
    nome: String,
    // campo número
    idade: Number
})

// 3 - Criando um model

// model "Pessoa" ligado ao schema (coleção "pessoas" no banco)
const Pessoa = mongoose.model("Pessoa", pessoaSchema)

// cria um documento em memória (ainda não foi salvo no banco)
const matheus = new Pessoa({
    nome: "Matheus",
    idade: 30
})

// lê as propriedades do documento
console.log(matheus.nome)
console.log(matheus.idade)

// 4 - Salvar dados

// matheus.save(function(err) {
//     if(err) {
//         console.log(err)
//     }
// })

// 5 - encontrar dados

// busca a primeira pessoa com nome "Matheus" (callback foi removido no Mongoose 7; hoje usa-se await)
Pessoa.findOne({ nome: 'Matheus' }, function(err, pessoa) {
    console.log(pessoa)
})

// 6 - insertmany

// Pessoa.insertMany([
//     {nome: "Pedro", idade: 40},
//     {nome: "Maria", idade: 25},
//     {nome: "José", idade: 23}
// ])


// busca todas as pessoas
async function getPessoas() {
    // find({}) sem filtro traz todos; exec() executa a consulta e retorna uma Promise
    const pessoas = await Pessoa.find({}).exec()
    console.log(pessoas)
}

// executa a busca
getPessoas()

// 7 - Deletar

// mostra José antes de deletar (a função está declarada mais abaixo; funções declaradas sobem para o topo - hoisting)
getPessoa("José")

// remove o primeiro documento com nome "José"
Pessoa.deleteOne({ nome: "José"}).exec()

// busca pessoas pelo nome e mostra o resultado
async function getPessoa(nome) {
    // find retorna um array
    const pessoa = await Pessoa.find({nome: nome}).exec()
    // array vazio = ninguém com esse nome
    if(pessoa.length == 0) {
        console.log("Esta pessoa não existe")
    } else {
        console.log(pessoa)
    }
}

// verifica se José foi removido (como tudo é assíncrono, a ordem das respostas pode variar)
getPessoa("José")

// 8 - atualizacao

// altera a idade de Maria para 66
Pessoa.updateOne({ nome: "Maria" }, { idade: 66}).exec()

// mostra Maria
getPessoa("Maria")

// 9 - where

// busca por nome e idade mínima usando o encadeamento where()
async function getPessoaNomeIdade(nome, idade) {
    const pessoa = await Pessoa
    // idade maior ou igual (gte = greater than or equal)
    .where('idade').gte(idade)
    // nome igual
    .where('nome', nome)
    // executa
    .exec()
  
    // nenhum resultado
    if(pessoa.length == 0) {
        console.log("Esta pessoa não existe")
    } else {
        console.log(pessoa)
    }
}

// busca Matheus com 30 anos ou mais
getPessoaNomeIdade("Matheus", 30)

