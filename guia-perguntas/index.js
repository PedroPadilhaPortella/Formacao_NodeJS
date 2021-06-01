const express = require('express')
const app = express()
const port = 8080

// Definindo o View Engine para o EJS
app.set('view engine', 'ejs');

app.get('/:page/:nome/:language', (req,  res) => {
    var nome = req.params.nome
    var language = req.params.language
    var page = req.params.page
    res.render('home', { nome, language, page });
});


app.listen(port, () => console.log(`Running at port ${port}\nhttp://localhost:${port}`))