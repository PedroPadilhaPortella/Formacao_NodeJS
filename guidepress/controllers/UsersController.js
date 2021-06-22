const router = require('express').Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const authentication = require('../middlewares/authentication');

// Lista de Usuarios
router.get('/admin', authentication, (req, res) => {
    const sessao = req.session.user;
    UserModel.findAll().then(users => {
        res.render('admin/users/index', { users, sessao })
    });
});

// Novo Usuario
router.get('/admin/create', authentication, (req, res) => {
    const sessao = req.session.user;
    res.render('admin/users/create', { sessao });
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
                .then(() => res.redirect('/users/admin'))
                .catch(() => res.redirect('/users/admin/create'))
            } else {
                res.redirect('/users/admin/create')
            }
        });
    } else {
        res.redirect('/users/admin/create')
    }
});

//Excluir Usuário
router.post('/admin/delete', (req, res) => {
    const id = req.body.id;
    UserModel.destroy({ where: { id }})
        .then(() => res.redirect('/users/admin'))
});

// Editar Usuário
router.get('/admin/edit/:id', authentication, (req, res) => {
    const id = req.params.id;
    const sessao = req.session.user;
    if(!isNaN(id)) {
        UserModel.findByPk(id).then((user) => {
            if(user != undefined) {
                res.render('admin/users/edit', { user, sessao })
            } else {
                res.redirect('/users/admin')
            }
        }).catch(() => res.redirect('/users/admin'))
    } else {
        res.redirect('/users/admin')
    }
});

// Atualizar Usuário
router.post('/admin/update', (req, res) => {
    const id = req.body.id
    const email = req.body.title
    const oldPassword = req.body.oldPassword
    const password = req.body.password

    if(email != '' && oldPassword != '' && password != '') {
        UserModel.findOne({ where: { email }}).then(user => {
            if(user == undefined) {
                // Hashing da senha
                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(password, salt);
        
                UserModel.create({ email, password: hash })
                .then(() => res.redirect('/users/admin'))
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