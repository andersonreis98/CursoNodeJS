// configuração do Vue CLI
module.exports = {
  // configurações do servidor de desenvolvimento (npm run serve)
  devServer: {
      // repassa para a API as requisições que o servidor do Vue não reconhece
      proxy: 'http://localhost:3000/api/'
    }
}