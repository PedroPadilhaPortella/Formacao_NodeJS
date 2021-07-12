class Table {
    constructor(lines) {
        this.header = lines.shift();
        this.rows = lines;
    }

    get rowCount() {
        return this.rows.length;
    }

    get columnCount() {
        return this.header.length;
    } 

}

module.exports = Table;