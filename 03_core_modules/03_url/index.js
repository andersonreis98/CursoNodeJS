// módulo nativo para trabalhar com URLs
const url = require('url');

// URL de exemplo
const adress = 'http://meusite.com.br/catalogo?produtos=cadeira';
// cria um objeto URL, que separa cada parte do endereço
const parseUrl = new url.URL(adress);

// domínio: meusite.com.br
console.log(parseUrl.host);
// caminho: /catalogo
console.log(parseUrl.pathname);
// query string completa: ?produtos=cadeira
console.log(parseUrl.search);
// objeto com os parâmetros da query string
console.log(parseUrl.searchParams);	
// valor de um parâmetro específico: cadeira
console.log(parseUrl.searchParams.get('produtos'));
