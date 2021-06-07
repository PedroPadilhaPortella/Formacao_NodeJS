const express = require('express')
const bodyparser = require('body-parser')
const connection = require('./database/database')
const PerguntasContext = require('./database/Perguntas')
const RespostasContext = require('./database/Respostas')

const app = express()
const port = 8080

//Database
connection.authenticate()
    .then(() => console.log('Conexão efetuada com o Banco de Dados'))
    .catch(() => console.log('Erro ao conectar com o banco de dados'))

// Configurando o formatador de Json
// app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyparser.urlencoded({
    extended: false
}));

// Definindo o View Engine para o EJS
app.set('view engine', 'ejs');

// Definindo o Diretório para os Arquivos Estáticos
app.use(express.static('public'));


//routes
app.get('/', (req, res) => {
    PerguntasContext.findAll({
        raw: true,
        order: [
            ['updatedAt', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', { perguntas })
    });
});

app.get('/ask', (req, res) => {
    res.render('ask')
});

app.get('/ask/:id', (req, res) => {
    const id = req.params.id
    PerguntasContext.findOne({
        where: { id: id },
        raw: true,
    }).then(pergunta => {
        if (pergunta) {
            RespostasContext.findAll({
                where: { perguntaId: pergunta.id },
                order: [ ['updatedAt', 'DESC'] ],
            }).then((respostas) => {
                res.render('question', { pergunta, respostas })
            });
        } else {
            res.redirect('/')
        }
    });
});


app.post('/save-question', (req, res) => {
    const titulo = req.body.title
    const descricao = req.body.description
    PerguntasContext.create({ titulo, descricao})
        .then(() => res.redirect('/'))
});

app.post('/answer-question', (req, res) => {
    const perguntaId = req.body.pergunta
    const descricao = req.body.descricao
    RespostasContext.create({ descricao, perguntaId})
        .then(() => res.redirect(`/ask/${perguntaId}`))
});


app.listen(port, () => console.log(`Running at port ${port}\nhttp://localhost:${port}`))