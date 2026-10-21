// importa o módulo criado por nós mesmos (arquivo local, por isso o "./")
const meuModulo = require('./meu_modulo.js')
// pega a função "soma" de dentro do objeto exportado pelo módulo
const soma = meuModulo.soma;
// chama a função passando 10 e 20 (imprime 30)
soma(10,20)
// chama a função passando 100 e 200 (imprime 300)
soma(100,200)
