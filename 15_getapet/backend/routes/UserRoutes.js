// importa o Express e já cria o roteador
const router = require("express").Router();

// importa o controller de usuários
const UserController = require("../controllers/UserController");

// middlewares
// verifica o token JWT
const verifyToken = require("../helpers/check-token");
// recebe o upload de imagens
const { imageUpload } = require("../helpers/image-upload");

// POST /users/register -> cadastro
router.post("/register", UserController.register);
// POST /users/login -> login
router.post("/login", UserController.login);
// GET /users/checkuser -> retorna o usuário dono do token (ou null)
router.get("/checkuser", UserController.checkUser);
// GET /users/:id -> dados públicos de um usuário
router.get("/:id", UserController.getUserById);
// PATCH /users/edit/:id -> edita o perfil
router.patch(
  "/edit/:id",
  // exige token
  verifyToken,
  // recebe um único arquivo do campo "image" (fica em req.file)
  imageUpload.single("image"),
  UserController.editUser
);

// exporta o roteador
module.exports = router;
