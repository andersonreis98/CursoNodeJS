// estilos do select (CSS Module)
import styles from './Select.module.css'

// componente de lista de opções reutilizável
function Select({ text, name, options, handleOnChange, value }) {
  return (
    <div className={styles.form_control}>
      {/* rótulo ligado ao select */}
      <label htmlFor={name}>{text}:</label>
      <select
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
        {/* primeira opção, sem valor */}
        <option>Selecione uma opção</option>
        {/* cria uma <option> para cada item do array; key ajuda o React a identificar cada item */}
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

// exporta o componente
export default Select
