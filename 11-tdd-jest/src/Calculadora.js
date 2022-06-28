class Calculadora {

    somar(a, b) {
        return a + b;
    }

    subtrair(a, b) {
        return a - b;
    }

    multiplicar(a, b) {
        return a * b;
    }

    dividir(a, b) {
        if(a && b) {
            return a / b;
        }
        return 0;
    }

    modular(a, b) {
        if(a && b) {
            return a % b;
        }
        return 0;
    }
}

module.exports = new Calculadora();