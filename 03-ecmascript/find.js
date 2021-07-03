/*
        O metodo find é um novo metodo de manipulação de arrays, assim como o
    'map', 'filter' e 'reduce'.
        Ele tem a função de encontrar a primeira ocorrencia de uma determinada expressão
    ou retornan undefined.
*/


const pedro = { nome: 'Pedro Portella', idade: 20 }
const daniel = { nome: 'Daniel Portella', idade: 12 }
const samuel = { nome: 'Samuel Portella', idade: 23 }
const matheus = { nome: 'Matheus Honorato', idade: 20 }
const denis = { nome: 'Denis Padilha', idade: 12 }
const davi = { nome: 'Davi Padilha', idade: 12 }

const people = [pedro, daniel, samuel, matheus, denis, davi ];

console.log(people.find(person => person.idade == 23));