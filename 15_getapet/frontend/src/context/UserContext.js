// createContext cria um "estado global" que qualquer componente pode ler
import React, { createContext } from "react";

// hook com a lógica de autenticação
import useAuth from "../hooks/useAuth";

// cria o contexto
const Context = createContext();

// componente que fornece os dados do contexto para os filhos
function UserProvider({ children }) {
  // pega as funções e estados do hook de autenticação
  const { authenticated, loading, register, login, logout } = useAuth();

  // tudo que estiver em "value" fica acessível com useContext(Context)
  return (
    <Context.Provider
      value={{ loading, authenticated, register, login, logout }}
    >
      {/* children são os componentes colocados dentro do <UserProvider> */}
      {children}
    </Context.Provider>
  );
}

// exporta o contexto (para ler) e o provider (para envolver a aplicação)
export { Context, UserProvider };
