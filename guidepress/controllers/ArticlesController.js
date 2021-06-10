const router = require('express').Router();

router.get('/admin/new', (req, res) => {
    res.render('admin/articles/new')
});

router.post('/save', (req, res) => {
});


module.exports = router;