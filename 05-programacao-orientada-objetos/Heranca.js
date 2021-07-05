class Animal {
    constructor(nome, idade, preco) {
        this.nome = nome;
        this.idade = idade;
        this.preco = preco
    }

    cuidar() {
        console.log("cuidando do " + this.nome + " . . .");
    }
}

class Cachorro extends Animal {
    constructor(nome, idade, preco, raca) {
        super(nome, idade, preco)
        this.raca = raca;
    }

    latir() {
        console.log("Au Au Au . . .");
    }

    cuidar() {
        console.log(`Cuidando do cachorro ${this.nome}`);
    }
}

class Gato extends Animal {
    constructor(nome, idade, preco, raca) {
        super(nome, idade, preco)
        this.raca = raca;
    }

    miar() {
        console.log("Miau . . .");
    }

    cuidar() {
        super.cuidar() // reaplica o metodo base
        console.log(`Cuidando do gato ${this.nome}`);
    }
}

const dog = new Cachorro('rubens', 5, 50.00, 'husk')
const cat = new Gato('floquinho', 5, 50.00, 'siames')

dog.cuidar()
dog.latir()

cat.cuidar()
cat.miar()