const express = require('express')
const bodyparser = require('body-parser')
const connection = require('./database/database')
const PerguntasContext = require('./database/Perguntas')

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
    PerguntasContext.findAll({ raw: true, order: [ ['updatedAt', 'DESC'] ] })
        .then(perguntas => {
            res.render('index', { perguntas })
        });
});

app.get('/ask/:id', (req, res) => {
    const id = req.params.id

    PerguntasContext.findOne({ where: { id: id }, raw: true, })
        .then(pergunta => {
            if(pergunta)
                res.render('question', { pergunta })
            else
                res.redirect('/')
        });
});

app.get('/ask', (req, res) => {
    res.render('ask')
});

app.post('/save-question', (req, res) => {
    const titulo = req.body.title
    const descricao = req.body.description
    PerguntasContext.create({ titulo, descricao }).then(() => res.redirect('/'))
});


app.listen(port, () => console.log(`Running at port ${port}\nhttp://localhost:${port}`))