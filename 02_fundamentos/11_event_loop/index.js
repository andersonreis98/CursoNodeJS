// Ordem de execução: c -> a -> b
// o Node executa o código em ordem, uma linha de cada vez (pilha de chamadas)
// declara a função a
function a() {
  console.log('Executando a()')
}

// declara a função b
function b() {
  console.log('Executando b()')
}

// declara a função c, que chama a() e depois b()
function c() {
  console.log('Executando c()')
  // a() só termina antes de b() começar
  a()
  b()
}

// inicia a execução chamando c()
c()

