// useState guarda os dados do formulário
import { useState } from 'react'

// estilos do formulário (CSS Module)
import formStyles from './Form.module.css'

// componentes de campo reutilizáveis
import Input from './Input'
import Select from './Select'

// formulário usado tanto para cadastrar quanto para editar um pet
function PetForm({ handleSubmit, petData, btnText }) {
  // dados do pet; na edição começa com os dados recebidos, no cadastro começa vazio
  const [pet, setPet] = useState(petData || {})
  // arquivos escolhidos, para mostrar a pré-visualização
  const [preview, setPreview] = useState([])
  // opções de cor
  const colors = ['Branco', 'Preto', 'Cinza', 'Caramelo']

  // quando o usuário escolhe imagens
  function onFileChange(e) {
    // FileList não é array; Array.from converte
    console.log(Array.from(e.target.files))
    // guarda os arquivos para a pré-visualização
    setPreview(Array.from(e.target.files))
    // copia o pet atual (...pet) e substitui as imagens
    setPet({ ...pet, images: [...e.target.files] })
  }

  // atualiza qualquer campo de texto/número pelo atributo name
  function handleChange(e) {
    // [e.target.name] usa o nome do campo como chave do objeto
    setPet({ ...pet, [e.target.name]: e.target.value })
  }

  // atualiza a cor com o texto da opção selecionada
  function handleColor(e) {
    setPet({
      ...pet,
      color: e.target.options[e.target.selectedIndex].text,
    })
  }

  // envio do formulário
  const submit = (e) => {
    // impede o recarregamento da página (comportamento padrão do form)
    e.preventDefault()
    // chama a função recebida do componente pai com os dados do pet
    handleSubmit(pet)
  }

  return (
    <form onSubmit={submit} className={formStyles.form_container}>
      {/* área de pré-visualização das imagens */}
      <div className={formStyles.preview_pet_images}>
        {/* se o usuário escolheu arquivos agora, mostra eles; senão, mostra as imagens já salvas do pet */}
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`${process.env.REACT_APP_API}/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}`}
              />
            ))}
      </div>
      {/* campo de arquivos (várias imagens) */}
      <Input
        text="Imagens do Pet"
        type="file"
        name="images"
        handleOnChange={onFileChange}
        multiple={true}
      />
      {/* nome; "|| ''" evita valor undefined no campo controlado */}
      <Input
        text="Nome do Pet"
        type="text"
        name="name"
        placeholder="Digite o nome"
        handleOnChange={handleChange}
        value={pet.name || ''}
      />
      {/* idade */}
      <Input
        text="Idade do Pet"
        type="number"
        name="age"
        placeholder="Digite a idade"
        handleOnChange={handleChange}
        value={pet.age || ''}
      />
      {/* peso */}
      <Input
        text="Peso do Pet"
        type="number"
        name="weight"
        placeholder="Digite o peso aproximado"
        value={pet.weight || ''}
        handleOnChange={handleChange}
      />
      {/* cor */}
      <Select
        name="color"
        text="Selecione a categoria"
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ''}
      />
      {/* botão com o texto recebido por props ("Cadastrar" ou "Atualizar") */}
      <input type="submit" value={btnText} />
    </form>
  )
}

// exporta o componente
export default PetForm
