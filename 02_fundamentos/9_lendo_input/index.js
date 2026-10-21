// readline é um core module para ler o que o usuário digita no terminal
// createInterface liga a entrada (teclado) e a saída (tela)
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// question mostra a pergunta e chama a função com a resposta digitada
readline.question(`Qual a sua linguagem preferida? `, (language) => {
  // imprime a resposta
  console.log(`A minha linguagem preferida é: ${language}`);
  // fecha a interface; sem isso o programa fica esperando entrada
  readline.close();
});
