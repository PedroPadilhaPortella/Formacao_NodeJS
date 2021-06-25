let nome = 'Pedro'; // Local, Global e de Escopo
var sobrenome = 'Portella'; // Local e Global

function log() {
    //Local
    console.log("User " + nome, sobrenome);
}

{
    //Bloco
    var idade = 20
    let ano = 2021
}

//Global
console.log("User " + nome, sobrenome);
console.log("Idade " + idade + " em " + ano);
log();