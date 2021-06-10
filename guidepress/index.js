const express = require('express');
const bodyParser = require("body-parser");
const connection = require("./database/database")
const ArticleModel = require('./models/Article')
const CategoryModel = require('./models/Category')

//Import das controllers
const articlesController = require('./controllers/ArticlesController')
const categoriesController = require('./controllers/CategoriesController')

const port = 8080;
const app = express();

connection.authenticate()
    .then(() => console.log('Conexão efetuada com o Banco de Dados'))
    .catch(() => console.log('Erro ao conectar com o banco de dados'))

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Configurando middlewares das controllers
app.use('/categories', categoriesController)
app.use('/articles', articlesController)

app.get('/', (req, res) => {
    res.render('index')
});


app.listen(port, () => console.log(`Server running at https://localhost:${port}`))