const router = require('express').Router();
const slugify = require('slugify')
const CategoryModel = require('../models/Category')

router.get('/admin', (req, res) => {
    CategoryModel.findAll({ raw: true }).then((categories) => {
        console.log(categories);
        res.render('admin/categories/index', { categories })
    })
});

router.get('/admin/new', (req, res) => {
    res.render('admin/categories/new')
});

router.post('/save', (req, res) => {
    const title = req.body.title

    if(title != undefined || title != '') {
        const slug = slugify(title)
        CategoryModel.create({ title, slug })
            .then(() => res.redirect('/'))
    } else {
        res.redirect('/categories/admin/new')
    }
});


module.exports = router;