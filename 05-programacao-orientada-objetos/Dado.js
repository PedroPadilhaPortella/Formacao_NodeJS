class Dado {
    constructor(faces) {
        this.faces = faces;
    }

    rolar() {
        const numero = Math.floor(Math.random() * this.faces + 1);
        console.log(`O numero foi ${numero}`);
    }
}

const dado = new Dado(10)


dado.rolar()