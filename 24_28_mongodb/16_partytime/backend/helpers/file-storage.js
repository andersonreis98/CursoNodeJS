// multer: recebe arquivos enviados
const multer = require("multer");
// módulo nativo para pegar a extensão do arquivo
const path = require("path");

// configura onde e com que nome os arquivos serão salvos
const diskStorage = multer.diskStorage({
    // pasta de destino
    destination: (req, file, cb) => {
        cb(null, 'public/img/');
    },
    // nome do arquivo: data atual em milissegundos + extensão original
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

// exporta a configuração (usada com multer({ storage: diskStorage }) nas rotas)
module.exports = diskStorage;