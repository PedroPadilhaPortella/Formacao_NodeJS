user = {
    nome: 'pedro portella',
    faculdade: {
        nome: 'fatec zona sul',
        curso: 'análise e desenvolvimento de sistemas',
    },
    idade: 20,
    emprego: {
        empresa: 'GFT',
        cargo: 'analista de sistemas júnior',
    }
}

let biografia = `Meu nome é ${user.nome}, tenho ${user.idade} e estudo ${user.faculdade.curso} 
na ${user.faculdade.nome}, trabalho na ${user.emprego.empresa} como ${user.emprego.cargo}.`;

console.log(biografia);