const Reader = require("./Reader")
const Writer = require("./Writer")
const Processor = require("./Processor")
const Table = require("./Table")
const HtmlParser = require('./HtmlParser')
const PDFWriter = require('./PDFWriter')

async function main() {
    const reader = new Reader();
    const writer = new Writer();

    const file = await reader.read('./files/data.csv');

    const rows = Processor.process(file);

    const usuarios = new Table(rows);

    const html = await HtmlParser.parse(usuarios);

    writer.write(`./html/index-${Date.now()}.html`, html);

    PDFWriter.writePDF(`./pdf/file-${Date.now()}.pdf`, html);
}

main();