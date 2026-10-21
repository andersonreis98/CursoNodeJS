// mais de uma valor
const x = 10;
const y = "Matheus";

// console.log aceita vários valores separados por vírgula
console.log(x, y);

// contagem de impressões
// console.count conta quantas vezes foi chamado com o mesmo texto
console.count("O valor de x é: " + x + " -> contagem:");
console.count("O valor de x é: " + x + " -> contagem:");
console.count("O valor de x é: " + x + " -> contagem:");
// texto diferente, então a contagem começa de novo em 1
console.count("O valor de y é: " + y + " -> contagem:");

// variável entre string
// %s é substituído pelo valor seguinte (string)
console.log("O nome dele é %s", y);

// limpando console
// depois de 2 segundos, console.clear() limpa o terminal
setTimeout(() => {
  console.clear();
}, 2000);

