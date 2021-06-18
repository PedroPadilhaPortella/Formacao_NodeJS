const router = require('express').Router();
const bcrypt = require('bcryptjs')
const UserModel = require('../models/User')

// Lista de Usuarios
router.get('/admin', (req, res) => {
    res.send('listagem de usuarios')
});

// Novo Usuario
router.get('/admin/create', (req, res) => {
    res.render('admin/users/create')
});

// Salvar Usuario
router.post('/admin/save', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email != '' && password != '') {
        UserModel.findOne({ where: { email }}).then(user => {
            if(user == undefined) {
                // Hashing da senha
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
        
                UserModel.create({ email, password: hash })
                .then(() => res.redirect('/'))
                .catch(() => res.redirect('/users/admin/create'))
            } else {
                res.redirect('/users/admin/create')
            }
        });
    } else {
        res.redirect('/users/admin/create')
    }
});


module.exports = router;