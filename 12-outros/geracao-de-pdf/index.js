const pdf = require('html-pdf');
const ejs = require('ejs');

const nome = 'Pedro Portella'

ejs.renderFile('./file.ejs', { nome }, (err, html) => {
    if(err) {
        console.log(err)
    } else {
        console.log(html)
        pdf.create(html).toFile('./pdf/teste.pdf', (err, res) => {
            if(err) {
                console.log(err)
            } else {
                console.log(res)
            }
        });
    }
})
