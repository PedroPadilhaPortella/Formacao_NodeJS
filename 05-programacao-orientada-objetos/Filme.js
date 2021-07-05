class Filme {
    constructor(titulo, ano, genero) {
        this.titulo = titulo;
        this.ano = ano;
        this.genero = genero;
    }

    reproduzir() { console.log(`Reproduzindo ${this.titulo}...`) }

    toString() { console.log(`Titulo: ${this.titulo}, Ano: ${this.ano}, Genero: ${this.genero}`) }
}

const vingadores = new Filme('Vingadores', 2018, 'Ação')

vingadores.titulo = 'Vingadores: Guerra Infinita'

vingadores.reproduzir()

vingadores.toString()