// hooks do React
import React, { useEffect, useState } from "react";
// barramento de eventos usado para receber as mensagens flash
import bus from "../../utils/bus";

// estilos da mensagem (CSS Module)
import styles from "./Message.module.css";

// componente que mostra mensagens de sucesso/erro
function Message() {
  // se a mensagem está visível
  let [visibility, setVisibility] = useState(false);
  // texto da mensagem
  let [message, setMessage] = useState("");
  // tipo da mensagem ('success' ou 'error')
  let [type, setType] = useState("");

  // registra o ouvinte uma única vez, quando o componente é montado
  useEffect(() => {
    // quando alguém emitir o evento 'flash', recebe { message, type }
    bus.addListener("flash", ({ message, type }) => {
      // mostra a mensagem
      setVisibility(true);
      setMessage(message);
      setType(type);
      // esconde depois de 4 segundos
      setTimeout(() => {
        setVisibility(false);
      }, 4000);
    });
  }, []);

  // executa depois de cada renderização (sem array de dependências)
  useEffect(() => {
    // se existir um elemento com a classe "close", fecha a mensagem ao clicar nele
    // (neste componente não há esse botão, então o código não faz efeito)
    if (document.querySelector(".close") !== null) {
      document
        .querySelector(".close")
        .addEventListener("click", () => setVisibility(false));
    }
  });

  // só renderiza a div quando visibility é true (o && evita renderizar quando é false)
  return (
    visibility && (
      // combina a classe base com a classe do tipo (styles.success ou styles.error)
      <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  );
}

// exporta o componente
export default Message;
