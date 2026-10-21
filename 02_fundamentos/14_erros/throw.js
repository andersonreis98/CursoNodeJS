// x é uma string ("10" entre aspas), não um número
const x = "10";

// Number.isInteger verifica se o valor é um número inteiro; com string retorna false
if (!Number.isInteger(x)) {
  // throw lança um erro e interrompe o programa
  throw new Error("O valor de x não é um número inteiro");
}

