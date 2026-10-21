// importa o model Pet
const Pet = require('../models/Pet')

// helpers (funções auxiliares)
// busca o usuário a partir do token
const getUserByToken = require('../helpers/get-user-by-token')
// extrai o token do cabeçalho Authorization
const getToken = require('../helpers/get-token')
// ObjectId do Mongoose, usado para validar ids
const ObjectId = require('mongoose').Types.ObjectId

// controller com a lógica das rotas de pets
module.exports = class PetController {
  // cria um pet
  static async create(req, res) {
    // dados enviados pelo formulário (multipart/form-data)
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    // arquivos recebidos pelo multer (imageUpload.array)
    const images = req.files
    // todo pet novo começa disponível para adoção
    const available = true

    // console.log(req.body)
    // mostra as imagens recebidas no terminal
    console.log(images)
    // return

    // validações
    // cada campo obrigatório que faltar gera 422 e encerra
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatória!' })
      return
    }

    // atenção: req.files é um array; vazio ([]) também é "verdadeiro", então esta validação não pega a falta de imagens
    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    }

    // pega o usuário
    // o dono do pet é o usuário do token
    const token = getToken(req)
    const user = await getUserByToken(token)

    // cria o pet
    // novo documento (ainda não salvo)
    const pet = new Pet({
      name: name,
      age: age,
      description: description,
      weight: weight,
      color: color,
      available: available,
      // começa vazio; os nomes dos arquivos são adicionados abaixo
      images: [],
      // copia alguns dados do dono para dentro do pet
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    })

    // adiciona o nome de cada arquivo salvo ao array de imagens
    images.map((image) => {
      pet.images.push(image.filename)
    })

    // tenta salvar
    try {
      // salva no banco
      const newPet = await pet.save()

      // 201 = criado
      res.status(201).json({
        message: 'Pet cadastrado com sucesso!',
        newPet: newPet,
      })
    // erro ao salvar
    } catch (error) {
      res.status(500).json({ message: error })
    }
  }

  // lista todos os pets cadastrados
  static async getAll(req, res) {
    // sort('-createdAt'): ordena do mais novo para o mais antigo (o "-" inverte a ordem)
    const pets = await Pet.find().sort('-createdAt')

    // responde com a lista
    res.status(200).json({
      pets: pets,
    })
  }

  // lista todos os pets do usuário
  static async getAllUserPets(req, res) {
    // pega o usuário
    const token = getToken(req)
    const user = await getUserByToken(token)

    // busca pets em que o campo user._id é o do usuário logado (consulta em campo aninhado)
    const pets = await Pet.find({ 'user._id': user._id })

    // responde com a lista
    res.status(200).json({
      pets,
    })
  }

  // lista todas as adoções do usuário
  static async getAllUserAdoptions(req, res) {
    // pega o usuário
    const token = getToken(req)
    const user = await getUserByToken(token)

    // pets em que o usuário logado é o adotante
    const pets = await Pet.find({ 'adopter._id': user._id })

    // responde com a lista
    res.status(200).json({
      pets,
    })
  }

  // busca um pet específico
  static async getPetById(req, res) {
    // id vindo da URL
    const id = req.params.id

    // verifica se o id é válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // verifica se o pet existe
    const pet = await Pet.findOne({ _id: id })

    // não encontrado
    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    // encontrado
    res.status(200).json({
      pet: pet,
    })
  }

  // remove um pet
  static async removePetById(req, res) {
    // id vindo da URL
    const id = req.params.id

    // verifica se o id é válido
    if (!ObjectId.isValid(id)) {
      res.status(422).json({ message: 'ID inválido!' })
      return
    }

    // verifica se o pet existe
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    // verifica se foi o usuário logado que cadastrou este pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    // ids do MongoDB são objetos: toString() permite comparar os valores
    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    // remove do banco (findByIdAndRemove foi removido no Mongoose 8; nas versões novas use findByIdAndDelete)
    await Pet.findByIdAndRemove(id)

    // confirma a remoção
    res.status(200).json({ message: 'Pet removido com sucesso!' })
  }

  // atualiza um pet
  static async updatePet(req, res) {
    // id e dados enviados
    const id = req.params.id
    const name = req.body.name
    const age = req.body.age
    const description = req.body.description
    const weight = req.body.weight
    const color = req.body.color
    const images = req.files
    const available = req.body.available

    // objeto com apenas os campos que serão atualizados
    const updateData = {}

    // verifica se o pet existe
    const pet = await Pet.findOne({ _id: id })

    if (!pet) {
      res.status(404).json({ message: 'Pet não encontrado!' })
      return
    }

    // verifica se foi o usuário logado que cadastrou este pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    // só o dono pode editar
    if (pet.user._id.toString() != user._id.toString()) {
      res.status(404).json({
        message:
          'Houve um problema em processar sua solicitação, tente novamente mais tarde!',
      })
      return
    }

    // validações
    // cada campo é validado e, se estiver ok, entra no updateData
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatório!' })
      return
    } else {
      updateData.name = name
    }

    if (!age) {
      res.status(422).json({ message: 'A idade é obrigatória!' })
      return
    } else {
      updateData.age = age
    }

    if (!weight) {
      res.status(422).json({ message: 'O peso é obrigatório!' })
      return
    } else {
      updateData.weight = weight
    }

    if (!color) {
      res.status(422).json({ message: 'A cor é obrigatória!' })
      return
    } else {
      updateData.color = color
    }

    // atenção: se nenhuma imagem nova for enviada, req.files é [] e as imagens antigas são apagadas
    if (!images) {
      res.status(422).json({ message: 'A imagem é obrigatória!' })
      return
    } else {
      // substitui as imagens pelos novos arquivos
      updateData.images = []
      images.map((image) => {
        updateData.images.push(image.filename)
      })
    }

    if (!available) {
      res.status(422).json({ message: 'O status é obrigatório!' })
      return
    } else {
      updateData.available = available
    }

    // a descrição é opcional
    updateData.description = description

    // aplica as alterações no banco
    await Pet.findByIdAndUpdate(id, updateData)

    // responde (o "pet" enviado ainda tem os dados antigos, de antes do update)
    res.status(200).json({ pet: pet, message: 'Pet atualizado com sucesso!' })
  }

  // agenda uma visita
  static async schedule(req, res) {
    // id do pet
    const id = req.params.id

    // verifica se o pet existe (atenção: não há if (!pet); um id inexistente derruba a requisição)
    const pet = await Pet.findOne({ _id: id })

    // verifica se o usuário é o dono deste pet
    const token = getToken(req)
    const user = await getUserByToken(token)

    // mostra o pet no terminal
    console.log(pet)

    // equals compara dois ObjectId; o dono não pode agendar visita com o próprio pet
    if (pet.user._id.equals(user._id)) {
      res.status(422).json({
        message: 'Você não pode agendar uma visita com seu próprio Pet!',
      })
      return
    }

    // verifica se o usuário já agendou visita para este pet
    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        res.status(422).json({
          message: 'Você já agendou uma visita para este Pet!',
        })
        return
      }
    }

    // adiciona o usuário ao pet como adotante
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image,
    }

    // mostra o pet atualizado no terminal
    console.log(pet)

    // salva no banco
    await Pet.findByIdAndUpdate(pet._id, pet)

    // responde com o contato do dono
    res.status(200).json({
      message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} no telefone: ${pet.user.phone}`,
    })
  }

  // conclui a adoção de um pet
  static async concludeAdoption(req, res) {
    // id do pet
    const id = req.params.id

    // verifica se o pet existe (atenção: não verifica se o pet existe nem se o usuário é o dono)
    const pet = await Pet.findOne({ _id: id })

    // marca como indisponível
    pet.available = false

    // salva no banco
    await Pet.findByIdAndUpdate(pet._id, pet)

    // responde com sucesso
    res.status(200).json({
      pet: pet,
      message: `Parabéns! O ciclo de adoção foi finalizado com sucesso!`,
    })
  }
}
