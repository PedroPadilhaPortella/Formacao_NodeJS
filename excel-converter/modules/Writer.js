const fs = require('fs')
const util = require('util')

class Writer {
    constructor() {
        //Gerando uma versão com promise do writeFile
        this.write = util.promisify(fs.writeFile);
    }

    async write(filename, data) {
        try {
            await this.write(filename, data);
            return true
        } catch(erro) {
            console.log(erro);
            return false;
        }
    }
}

module.exports = Writer;