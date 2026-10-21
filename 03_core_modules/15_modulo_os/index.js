// módulo nativo com informações do sistema operacional
const os = require('os');

console.log('Informações do sistema operacional:');
// tipo do sistema: Linux, Windows_NT, Darwin (macOS)
console.log('Nome do SO:', os.type());
// plataforma: linux, win32, darwin
console.log('Plataforma:', os.platform());
// arquitetura do processador: x64, arm64...
console.log('Arquitetura:', os.arch());
// versão do sistema/kernel
console.log('Versão:', os.release());
// memória RAM total em bytes
console.log('Memória total:', os.totalmem(), 'bytes');
// memória RAM livre em bytes
console.log('Memória livre:', os.freemem(), 'bytes');
// quantidade de núcleos de CPU
console.log('Número de CPUs:', os.cpus().length);
