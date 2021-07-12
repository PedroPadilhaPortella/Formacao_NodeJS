class Processor {

    static process(data) {
        const lines = data.split('\r\n')
        const rows = [];

        lines.forEach(line => {
            rows.push(line.split(';'))
        });

        return rows;
    }
}

module.exports = Processor;