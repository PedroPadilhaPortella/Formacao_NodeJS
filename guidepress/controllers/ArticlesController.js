const router = require('express').Router();
const slugify = require('slugify')
const CategoryModel = require('../models/Category')
const ArticleModel = require('../models/Article');

// Lista de Artigos
router.get('/admin', (req, res) => {
    ArticleModel.findAll({ raw: true, include: [{ model: CategoryModel, required: true }] })
    .then((articles) => {
        console.log(articles);
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

// Excluir Artigo
router.post('/admin/delete', (req, res) => {
    const id = req.body.id
    ArticleModel.destroy({ where: { id }})
    .then(() => res.redirect('/articles/admin'))
});

// Editar Artigo
router.get('/admin/edit/:id', (req, res) => {
    const id = req.params.id
    if(!isNaN(id)) {
        ArticleModel.findByPk(id).then((article) => {
            if(article != undefined) {
                CategoryModel.findAll({ raw: true}).then(categories => {
                    res.render('admin/articles/edit', { article, categories })
                }).catch(() => res.redirect('/articles/admin'))
            } else {
                res.redirect('/articles/admin')
            }
        }).catch(() => res.redirect('/articles/admin'))
    } else {
        res.redirect('/articles/admin')
    }
});

// Atualizar Artigo
router.post('/admin/update', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const categoryId = req.body.category
    const body = req.body.body

    if(title == '' || title == null || body == '' || body == null || categoryId == null) {
        res.redirect(`/articles/admin/edit/${id}`)
    } else {
        const slug = slugify(title)
        ArticleModel.update({ title, slug, body, categoryId }, {where: { id }})
            .then(() => res.redirect('/articles/admin'))
            .catch(() => { res.redirect(`/articles/admin/edit/:${id}`)})
    }
})

module.exports = router;