const router = require('express').Router();
const slugify = require('slugify')
const CategoryModel = require('../models/Category')
const authentication = require('../middlewares/authentication');

// Lista de Categorias
router.get('/admin', authentication, (req, res) => {
    const sessao = req.session.user;
    CategoryModel.findAll({ raw: true }).then((categories) => {
        console.log(categories);
        res.render('admin/categories/index', { categories, sessao })
    })
});

// Nova Categoria
router.get('/admin/new', authentication, (req, res) => {
    const sessao = req.session.user;
    res.render('admin/categories/new', { sessao });
});

// Salvar Categoria
router.post('/admin/save', (req, res) => {
    const title = req.body.title
    
    if(title != undefined && title != '') {
        const slug = slugify(title)
        CategoryModel.create({ title, slug })
        .then(() => res.redirect('/categories/admin'))
    } else {
        res.redirect('/categories/admin/new')
    }
});

// Excluir Categoria
router.post('/admin/delete', (req, res) => {
    const id = req.body.id
    CategoryModel.destroy({ where: { id }})
    .then(() => res.redirect('/categories/admin'))
});

// Editar Categoria
router.get('/admin/edit/:id', authentication, (req, res) => {
    const id = req.params.id
    const sessao = req.session.user;
    if(!isNaN(id)) {
        CategoryModel.findByPk(id).then((category) => {
            if(category != undefined) {
                res.render('admin/categories/edit', { category, sessao })
            } else {
                res.redirect('/categories/admin')
            }
        }).catch(() => res.redirect('/categories/admin'))
    } else {
        res.redirect('/categories/admin')
    }
});

// Atualizar Categoria
router.post('/admin/update', (req, res) => {
    const id = req.body.id
    const title = req.body.title

    if(title != undefined && title != '') {
        const slug = slugify(title)
        CategoryModel.update({ title, slug }, { where: { id }}).then(() => {
            res.redirect('/categories/admin')
        })
    } else {
        res.redirect(`/categories/admin/edit/${id}`)
    }
});


module.exports = router;