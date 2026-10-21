// constante não pode ter o valor reatribuído
const x = 10;

// try tenta executar o bloco de código
try {
  // isto gera erro: "Assignment to constant variable"
  x = 2;
// catch captura o erro, evitando que o programa quebre
} catch (err) {
  // mostra a mensagem do erro
  console.log(`Erro: ${err}`);
}

