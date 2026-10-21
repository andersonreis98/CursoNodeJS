// multer: middleware para receber arquivos enviados (multipart/form-data)
const multer = require("multer");
// módulo nativo para trabalhar com caminhos/extensões
const path = require("path");

// Destino onde a imagem será guardada
// diskStorage define onde e com que nome os arquivos serão salvos
const imageStorage = multer.diskStorage({
  // pasta de destino de cada arquivo
  destination: function (req, file, cb) {
    // nome da subpasta (users ou pets)
    let folder = "";

    // mostra a requisição inteira no terminal (só para depurar; gera muito texto)
    console.log(req)

    // baseUrl é o prefixo da rota: /users ou /pets
    if (req.baseUrl.includes('users')) {
      folder = "users";
    } else if (req.baseUrl.includes('pets')) {
      folder = "pets";
    }
    // cb(erro, caminho): salva em public/images/users/ ou public/images/pets/
    cb(null, `public/images/${folder}/`);
  },
  // nome do arquivo salvo
  filename: (req, file, cb) => {
    // usa a data atual em milissegundos + a extensão original, para não repetir nomes
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// configura o multer com o armazenamento e o filtro de tipo
const imageUpload = multer({
  // onde salvar
  storage: imageStorage,
  // função que decide se o arquivo é aceito
  fileFilter(req, file, cb) {
    // aceita apenas nomes terminados em .png ou .jpg
    if (!file.originalname.match(/\.(png|jpg)$/)) {
      // envia apenas os formatos png e jpg
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    // aceita o arquivo
    cb(undefined, true);
  },
});

// exporta dentro de um objeto (importado com { imageUpload })
module.exports = { imageUpload };
