// "events" é um core module que permite criar e disparar eventos personalizados
const EventEmitter = require('events')
// cria uma instância do emissor de eventos
const eventEmitter = new EventEmitter()

// on() registra um "ouvinte": a função roda toda vez que o evento 'start' for emitido
eventEmitter.on('start', () => {
  console.log('Durante')
})

// primeira mensagem impressa
console.log('Antes')

// emit() dispara o evento 'start', executando o ouvinte acima (imprime "Durante")
eventEmitter.emit('start')

// última mensagem impressa
console.log('Depois')

