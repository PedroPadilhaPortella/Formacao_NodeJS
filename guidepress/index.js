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
    ArticleModel.findAll({ raw: true }).then((articles) => {
        CategoryModel.findAll({ raw: true }).then(categories => {
            res.render('index', { articles, categories})
        });
    });
});

app.get('/:slug', (req, res) => {
    const slug = req.params.slug
    
    ArticleModel.findOne({ where: { slug }, order: [['id', 'DESC']], include: [{ model: CategoryModel }]})
    .then((article) => {
        if(article != undefined) {
            CategoryModel.findAll({ raw: true}).then((categories) => {
                res.render('article', { article, categories })
            });
            } else {
                res.redirect('/')
            }
        })
        .catch(() => res.redirect('/'))
});

app.get('/category/:slug', (req, res) => {
    const slug = req.params.slug
    
    CategoryModel.findOne({where: { slug }, include: [{ model: ArticleModel}] })
    .then((category) => {
        if(category != undefined) {
            CategoryModel.findAll({ raw: true }).then((categories) => {
                res.render('index', { articles: category.articles, categories })
            });
        } else {
            res.redirect('/')
        }
    }).catch(() => res.redirect('/'))
});


app.listen(port, () => console.log(`Server running at https://localhost:${port}`))