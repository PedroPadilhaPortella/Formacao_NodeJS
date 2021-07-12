const fs = require('fs')

function updateUser(name, course, categorie) {
    fs.readFile('./usuario.json', { encoding: 'utf-8' }, (erro, data) => {
        if(erro) {
            console.log('Ocorreu uma falha ao ler o arquivo');
        } else {
            var conteudo = JSON.parse(data)
            
            conteudo.nome = name;
            conteudo.curso = course;
            conteudo.categoria = categorie;

            console.log(conteudo);
    
            fs.appendFile('./usuario.json', JSON.stringify(conteudo), (erro) => {
                if(erro) {
                    console.log('Ocorreu uma falha ao salvar o arquivo');
                }
            });
        }
    });
}

updateUser('Pedro Portella', 'Análise e desenvolvimento de sistemas', 'Tecnologia')