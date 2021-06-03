const bodyparser = require('body-parser')
const connection = require('./database/database')
const express = require('express')
const app = express()
const port = 8080

//Database
connection.authenticate()
    .then(() => console.log('Conexão efetuada com o Banco de Dados'))
    .catch(() => console.log('Erro ao conectar com o banco de dados'))

// Configurando o formatador de Json
// app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyparser.urlencoded({ extended: false }));

// Definindo o View Engine para o EJS
app.set('view engine', 'ejs');
// Definindo o Diretório para os Arquivos Estáticos
app.use(express.static('public'));


//routes
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/ask', (req, res) => {
    res.render('ask')
});

app.post('/save-question', (req, res) => {
    res.json(req.body)
});


app.listen(port, () => console.log(`Running at port ${port}\nhttp://localhost:${port}`))