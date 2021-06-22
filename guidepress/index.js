const express = require('express');
const bodyParser = require("body-parser");
const session = require('express-session');
const bcrypt = require('bcryptjs');

const connection = require("./database/database");
const ArticleModel = require('./models/Article');
const CategoryModel = require('./models/Category');
const UserModel = require('./models/User');

const articlesController = require('./controllers/ArticlesController');
const categoriesController = require('./controllers/CategoriesController');
const usersController = require('./controllers/UsersController');

const port = 8080;
const app = express();


//Conexão do Banco de Dados
connection.authenticate()
.then(() => console.log('Conexão efetuada com o Banco de Dados'))
.catch(() => console.log('Erro ao conectar com o banco de dados'))


//Configurações
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'secret-key-guidepress',  cookie: { maxAge: 86400000 } }));


//Configurando middlewares das controllers
app.use('/categories', categoriesController);
app.use('/articles', articlesController);
app.use('/users', usersController);

//Index
app.get('/', (req, res) => {
    const sessao = req.session.user;
    ArticleModel.findAll({ order: [['id', 'DESC']], limit: 4 }).then((articles) => {
        CategoryModel.findAll({ raw: true }).then(categories => {
            res.render('index', { articles, categories, paginate: true, sessao })
        });
    });
});


// Login
app.get('/login', (req, res) => {
    const sessao = req.session.user;
    res.render('admin/users/login', { sessao })
});

// Logout
app.get('/logout', (req, res) => {
    req.session.user = undefined;
    res.redirect('/');
});

// Autenticar Usuário
app.post('/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    UserModel.findOne({ where: { email }})
    .then(user => {
        if(user != undefined) {
            const correct = bcrypt.compareSync(password, user.password);
            if(correct) {
                req.session.user = { id: user.id, email: user.email }
                res.redirect('/articles/admin');
            } else {
                res.redirect('login')
            }
        } else {
            res.redirect('/login')
        }
    })
    .catch(() => res.redirect('/login'))
});


//Get Artigo
app.get('/:slug', (req, res) => {
    const sessao = req.session.user;
    const slug = req.params.slug
    
    ArticleModel.findOne({ where: { slug }, order: [['id', 'DESC']], include: [{ model: CategoryModel }]})
    .then((article) => {
        if(article != undefined) {
            CategoryModel.findAll({ raw: true}).then((categories) => {
                res.render('article', { article, categories, sessao })
            });
            } else {
                res.redirect('/')
            }
        })
        .catch(() => res.redirect('/'))
});

//Get Lista de Artigos pela Categoria
app.get('/category/:slug', (req, res) => {
    const slug = req.params.slug
    const sessao = req.session.user;
    
    CategoryModel.findOne({where: { slug }, include: [{ model: ArticleModel}] })
    .then((category) => {
        if(category != undefined) {
            CategoryModel.findAll({ raw: true }).then((categories) => {
                res.render('index', { articles: category.articles, categories, paginate: false, sessao })
            });
        } else {
            res.redirect('/')
        }
    }).catch(() => res.redirect('/'))
});

//Get Lista de Artigos por página
app.get('/articles/page/:num', (req, res) => {
    const sessao = req.session.user;
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
                res.render('page', { result, categories, paginate: true, sessao })
            });
        });
}); 


app.listen(port, () => console.log(`Server running at https://localhost:${port}`))