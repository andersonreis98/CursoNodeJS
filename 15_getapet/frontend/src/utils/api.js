// axios faz requisições HTTP para a API
import axios from "axios";

// cria uma instância do axios com o endereço base da API (backend na porta 5000)
// assim basta chamar api.get('/pets') em vez da URL completa
export default axios.create({
  baseURL: "http://localhost:5000",
});
