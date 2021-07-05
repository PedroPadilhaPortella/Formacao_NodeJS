/* classes com metodos estáticos */

class Calculadora {
    static Somar(a, b) {
        return a + b
    }

    static Subtrair(a, b) {
        return a - b
    }
}

const soma = Calculadora.Somar(3, 3)
console.log(soma)
const subtracao = Calculadora.Subtrair(6, 2)
console.log(subtracao)