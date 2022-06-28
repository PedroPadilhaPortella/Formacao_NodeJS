const Calculadora = require("../src/Calculadora");

describe('Calculadora', () => {

    describe('Somar', () => {
        test('Deve retornar o valor 10 quando somados 5 + 5', () => {
            let resultado = Calculadora.somar(5, 5);
            expect(resultado).toEqual(10);
        });
        test('Deve retornar o valor 0 quando valores nulos são passados', () => {
            let resultado = Calculadora.somar(null, null);
            expect(resultado).toEqual(0);
        });
    });

    describe('Subtrair', () => {
        test('Deve retornar o valor 2 quando subtraídos 5 - 3', () => {
            let resultado = Calculadora.subtrair(5, 3);
            expect(resultado).toEqual(2);
        });
        test('Deve retornar o valor 0 quando valores nulos são passados', () => {
            let resultado = Calculadora.subtrair(null, null);
            expect(resultado).toEqual(0);
        });
    });

    describe('Multiplicar', () => {
        test('Deve retornar o valor 10 quando multiplicados 5 * 2', () => {
            let resultado = Calculadora.multiplicar(5, 2);
            expect(resultado).toEqual(10);
        });
        test('Deve retornar o valor 0 quando valores nulos são passados', () => {
            let resultado = Calculadora.multiplicar(null, null);
            expect(resultado).toEqual(0);
        });
    });

    describe('Dividir', () => {
        test('Deve retornar o valor 2.5 quando divididos 5 / 2', () => {
            let resultado = Calculadora.dividir(5, 2);
            expect(resultado).toEqual(2.5);
        });
        test('Deve retornar o valor NaN quando valores nulos são passados', () => {
            let resultado = Calculadora.dividir(null, null);
            expect(resultado).toEqual(0);
        });
        test('Deve retornar o valor 0 quando divididos 5 e 0', () => {
            let resultado = Calculadora.dividir(5, 0);
            expect(resultado).toEqual(0);
        });
    });

    describe('Modular', () => {
        test('Deve retornar o valor 2 quando divididos 5 % 3', () => {
            let resultado = Calculadora.modular(5, 3);
            expect(resultado).toEqual(2);
        });
        test('Deve retornar o valor 2 quando valores nulos são passados', () => {
            let resultado = Calculadora.modular(null, null);
            expect(resultado).toEqual(0);
        });
    });
});