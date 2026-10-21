// barramento de eventos
import bus from '../utils/bus'

// hook personalizado para disparar mensagens flash
export default function useFlashMessage() {
  // função que qualquer componente pode chamar para mostrar uma mensagem
  function setFlashMessage(msg, type) {
    // emite o evento 'flash'; o componente Message escuta e exibe a mensagem
    bus.emit('flash', {
      // texto
      message: msg,
      // tipo: 'success' ou 'error' (muda a cor)
      type: type,
    })
  }

  // retorna a função para quem usar o hook
  return { setFlashMessage }
}
