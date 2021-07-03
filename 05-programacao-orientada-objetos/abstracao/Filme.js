class Filme {
    constructor() {
        this.titulo = '';
        this.ano = 2000;
        this.sinopse = ''
        this.genero = '';
        this.diretor = '';
        this.atores = [];
        this.duracao = 10;
    }

    reproduzir() { console.log("reproduzindo...") }

    pausar() { console.log("pausado...") }
    
    avancar() { console.log("avancando...") }
    
    fechar() { console.log("fechando...") }
}