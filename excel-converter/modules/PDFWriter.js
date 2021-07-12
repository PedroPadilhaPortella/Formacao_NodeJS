const pdf = require('html-pdf')

class PDFWriter {
    static writePDF(filename, html) {
        pdf.create(html, {}).toFile(filename, (erro) => {
            if(erro) console.log(erro)
        });
    }
}

module.exports = PDFWriter;