const os = require('os');

console.log('Informações do sistema operacional:');
console.log('Nome do SO:', os.type());
console.log('Plataforma:', os.platform());
console.log('Arquitetura:', os.arch());
console.log('Versão:', os.release());
console.log('Memória total:', os.totalmem(), 'bytes');
console.log('Memória livre:', os.freemem(), 'bytes');
console.log('Número de CPUs:', os.cpus().length);