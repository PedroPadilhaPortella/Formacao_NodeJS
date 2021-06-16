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
    ArticleModel.findAll({ order: [['id', 'DESC']], limit: 4 }).then((articles) => {
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

app.get('/articles/page/:num', (req, res) => {
    const page = +req.params.num;
    let offset = 0;
    const limit = 4;
    
    if(isNaN(page) || page <= 1)
        offset = 0;
    else
        offset = (parseInt(page) - 1) * 4;

    ArticleModel.findAndCountAll({ limit, offset, order: [['id', 'DESC']] })
        .then(articles => {
            let next = true
            if(offset + limit >= articles.count) 
                next = false
            
            const result = { articles, page, next }
            
            CategoryModel.findAll().then(categories => {
                res.render('page', { result, categories})
            });
        });
}); 


app.listen(port, () => console.log(`Server running at https://localhost:${port}`))