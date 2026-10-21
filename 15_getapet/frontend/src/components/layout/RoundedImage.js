// estilos da imagem redonda (CSS Module)
import styles from './RoundedImage.module.css'

// componente de imagem arredondada; recebe src, alt e width por props
function RoundedImage({ src, alt, width }) {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  )
}

// exporta o componente
export default RoundedImage
