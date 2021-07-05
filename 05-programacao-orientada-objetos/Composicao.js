// Composicao

class Reader {
    readFile(path) {
        return "lendo arquivo"
    }
}

class Writer {
    writeFile(path, content) {
        return "escrevendo arquivo"
    }
}

class Creator {
    createFile(name) {
        return "criando arquivo"
    }
}

class Remover {
    removeFile(name) {
        return "removendo arquivo"
    }
}

class FileManipulator {
    constructor(nome) {
        this.arquivo = nome;
        this.reader = new Reader()
        this.writer = new Writer()
        this.creator = new Creator()
        this.remover = new Remover()
    }
}

const fileManipulator = new FileManipulator('myfile.txt')