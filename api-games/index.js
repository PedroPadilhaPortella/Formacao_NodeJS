const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');

const connection = require('./database')
const GameController = require('./controllers/GameController')
const UsersController = require('./controllers/UsersController')

const port = 3000
const app = express()

connection.authenticate()
    .then(() => console.log('Conexão efetuada com o Banco de Dados'))
    .catch(() => console.log('Erro ao conectar com o banco de dados'))


app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.status(200).end());

app.use(GameController)
app.use(UsersController)

app.listen(port, console.log(`API Running at http://localhost:${port}/`))