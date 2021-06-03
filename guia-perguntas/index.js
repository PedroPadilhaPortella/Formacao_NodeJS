const express = require('express')
const app = express()
const port = 8080

// Definindo o View Engine para o EJS
app.set('view engine', 'ejs');
// Definindo o Diretório para os Arquivos Estáticos
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index')
});

app.get('/ask', (req, res) => {
    res.render('ask')
});


app.listen(port, () => console.log(`Running at port ${port}\nhttp://localhost:${port}`))