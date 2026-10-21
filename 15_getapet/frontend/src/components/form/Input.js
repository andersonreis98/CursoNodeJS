// estilos do campo (CSS Module)
import styles from './Input.module.css'

// componente de campo reutilizável; as propriedades chegam por props (desestruturadas)
function Input({
  // tipo do input (text, email, password, file...)
  type,
  // texto do rótulo
  text,
  // name e id do campo
  name,
  // texto de exemplo
  placeholder,
  // função chamada a cada alteração
  handleOnChange,
  // valor atual (campo controlado pelo estado do componente pai)
  value,
  // permite selecionar vários arquivos
  multiple,
}) {
  return (
    <div className={styles.form_control}>
      {/* htmlFor é o "for" do HTML: liga o rótulo ao campo */}
      <label htmlFor={name}>{text}:</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  )
}

// exporta o componente
export default Input
