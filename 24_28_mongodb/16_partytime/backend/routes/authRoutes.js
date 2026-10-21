// importa o Express e já cria o roteador
const router = require("express").Router();
// bcrypt: hash e comparação de senhas
const bcrypt = require("bcrypt");
// jsonwebtoken: cria tokens JWT
const jwt = require("jsonwebtoken");

// importa o model User
const User = require("../models/user");

// POST /api/auth/register -> cadastro
router.post("/register", async (req, res) => {

    // dados enviados pelo front-end
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // mostra os dados recebidos
    console.log(req.body);

    // verifica os campos obrigatórios
    // atenção: campos não enviados chegam como undefined, e não null; por isso esta validação quase nunca dispara
    if(name === null || email === null || password === null || confirmpassword === null) {
        return res.status(400).json({ error: "Por favor, preencha todos os campos." });
    }

    // valida a confirmação de senha
    if(password != confirmpassword) {
        return res.status(400).json({ error: "As senhas não conferem." });
    }

    // verifica se o e-mail já está em uso
    const isEmailExists = await User.findOne({ email: req.body.email });

    // e-mail já cadastrado
    if (isEmailExists) {
        return res.status(400).json({ error: "O e-mail informado já está em uso." });
    }

    // criando a senha
    // salt com custo 12
    const salt = await bcrypt.genSalt(12);
    const reqPassword = req.body.password;

    // hash da senha
    const passwordHash = await bcrypt.hash(reqPassword, salt);
  
    // novo usuário (ainda não salvo)
    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    });

    // tenta salvar
    try {      

        // salva no banco
        const newUser = await user.save();

        // cria o token
        const token = jwt.sign(
            // dados guardados no token (payload)
            {
            name: newUser.name,
            id: newUser._id,
            },
            // segredo de assinatura
            "nossosecret"
        );
        
        // retorna o token
        res.json({ error: null, msg: "Você realizou o cadastro com sucesso!", token: token, userId: newUser._id });

    // erro ao salvar
    } catch (error) {

        res.status(400).json({ error })
        
    }

});

// POST /api/auth/login -> login
router.post("/login", async (req, res) => {

    // dados enviados
    const email = req.body.email;
    const password = req.body.password;

    // verifica se o usuário existe
    const user = await User.findOne({ email: email });

    // não encontrado
    if (!user) {
        return res.status(400).json({ error: "Não há usuário cadastrado com este e-mail!" });
    }

    // verifica se a senha confere
    const checkPassword = await bcrypt.compare(password, user.password)

    // senha errada
    if(!checkPassword) {
        return res.status(400).json({ error: "Senha inválida" });
    }

    // cria o token
    const token = jwt.sign(
        // dados guardados no token (payload)
        {
        name: user.name,
        id: user._id,
        },
        // segredo de assinatura
        "nossosecret"
    );

    // retorna o token
    res.json({ error: null, msg: "Você está autenticado!", token: token, userId: user._id });


})

// exporta o roteador
module.exports = router;