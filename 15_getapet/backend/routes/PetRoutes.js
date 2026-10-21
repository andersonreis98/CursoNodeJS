// importa o Express e já cria o roteador
const router = require('express').Router()

// importa o controller de pets
const PetController = require('../controllers/PetController')

// middlewares
// verifica o token JWT
const verifyToken = require('../helpers/check-token')
// recebe o upload de imagens
const { imageUpload } = require('../helpers/image-upload')

// POST /pets/create -> cadastra um pet
router.post(
  '/create',
  // 1º: exige token válido
  verifyToken,
  // 2º: recebe vários arquivos do campo "images" (ficam em req.files)
  imageUpload.array('images'),
  // 3º: salva o pet
  PetController.create,
)
// GET /pets -> lista todos os pets (público)
router.get('/', PetController.getAll)
// GET /pets/mypets -> pets do usuário logado (atenção: sem verifyToken; o controller lê o token mesmo assim)
router.get('/mypets', PetController.getAllUserPets)
// GET /pets/myadoptions -> pets que o usuário quer adotar
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
// GET /pets/:id -> detalhes de um pet (precisa vir depois das rotas fixas acima)
router.get('/:id', PetController.getPetById)
// DELETE /pets/:id -> remove um pet
router.delete('/:id', verifyToken, PetController.removePetById)
// PATCH /pets/:id -> atualiza um pet (com novas imagens opcionais)
router.patch(
  '/:id',
  verifyToken,
  imageUpload.array('images'),
  PetController.updatePet,
)
// PATCH /pets/schedule/:id -> agenda uma visita para adoção
router.patch('/schedule/:id', verifyToken, PetController.schedule)
// PATCH /pets/conclude/:id -> conclui a adoção
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

// exporta o roteador
module.exports = router
