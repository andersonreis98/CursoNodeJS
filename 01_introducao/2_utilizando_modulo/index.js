// pode utilizar import ou require
// require('fs') carrega o módulo nativo "fs" (File System), que lê e escreve arquivos
const fs = require('fs')//Filesystem

// readFile lê o arquivo de forma assíncrona: recebe o caminho, a codificação e uma função de callback
fs.readFile('arquivo.txt', 'utf8', (err, data) => {
    // se ocorrer algum erro (ex.: arquivo não existe), "err" vem preenchido
    if (err) {
        // mostra o erro no terminal
        console.log(err)
        // interrompe a função para não continuar
        return;
    } else {
        // se deu certo, "data" contém o conteúdo do arquivo como texto
        console.log(data)
    }
}

) // fecha a chamada de fs.readFile
