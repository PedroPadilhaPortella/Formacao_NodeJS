const fs = require('fs')

const content = '\nnew content . . .'

const file = fs.readFile('./pedro.portella', { encoding: 'utf-8' }, (erro, data) => {
    if(erro) {
        console.log('Ocorreu uma falha ao ler o arquivo');
    } else {
        console.log(data);
    }

    fs.appendFile('pedro.portella', content, (erro) => {
        if(erro) {
            console.log(erro);
        }
    })
})
