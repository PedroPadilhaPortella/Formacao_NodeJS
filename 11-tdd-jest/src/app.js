const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.end();
});

app.get('/cor/:pessoa', (req, res) => {
    const pessoa = req.params.pessoa;
    if(pessoa == 'pedro') {
        res.json({cor: 'laranja'});
    } else {
        res.json({cor: 'azul'});
    }
})

module.exports = app;