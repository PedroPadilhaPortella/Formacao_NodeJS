const fs = require('fs')
const util = require('util')

class Reader {

    constructor() {
        //Gerando uma versão com promise do readFile
        this.reader = util.promisify(fs.readFile);
    }

    async read(filepath) {
        try {
            return await this.reader(filepath, 'utf-8');
        } catch(erro) {
            return undefined;
        }
    }
}

module.exports = Reader;