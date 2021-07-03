var empresa = {
    email: 'guiadoprogramador@gmail.com',
    cidade: 'São Paulo',
    site: 'guiadoprogramador.com.br'
}

var user = {
    nome: 'Vinicius Lima',
    idade: 20,
    ...empresa
}

console.log(user);