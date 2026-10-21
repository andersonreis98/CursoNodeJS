// exemplo de execução: node index.js nome=Anderson idade=26
// nome=Anderson

// process.argv é um array com: [caminho do node, caminho do arquivo, ...argumentos]
// console.log(process.argv);

// slice(2) descarta os dois primeiros itens e fica só com os argumentos digitados
const args = process.argv.slice(2);

// console.log(args);

// pega o primeiro argumento ("nome=Anderson"), separa no "=" e fica com o valor
const nome = args[0].split("=")[1];

// imprime o nome
console.log(nome);

// mesmo processo para o segundo argumento ("idade=26")
const idade = args[1].split("=")[1];

// imprime a idade
console.log(idade);

// template string (crase) permite inserir variáveis com ${}
console.log(`Meu nome é ${nome} e minha idade é ${idade} anos.`)

