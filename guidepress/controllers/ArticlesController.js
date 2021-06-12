const router = require('express').Router();
const slugify = require('slugify')
const CategoryModel = require('../models/Category')
const ArticleModel = require('../models/Article');

// Lista de Artigos
router.get('/admin', (req, res) => {
    CategoryModel.findAll({ raw: true }).then((articles) => {
        res.render('admin/articles/index', { articles })
    })
});

// Novo Artigo
router.get('/admin/new', (req, res) => {
    CategoryModel.findAll({ raw: true}).then(categories => {
        res.render('admin/articles/new', { categories })
    });
});

// Salvar Artigo
router.post('/admin/save', (req, res) => {
    const title = req.body.title
    const categoryId = req.body.category
    const body = req.body.body

    if(title == '' || title == null || body == '' || body == null || categoryId == null) {
        res.redirect('/articles/admin/new')
    } else {
        const slug = slugify(title)
        ArticleModel.create({ title, slug, body, categoryId })
            .then(() => res.redirect('/articles/admin'))
    }
});


module.exports = router;