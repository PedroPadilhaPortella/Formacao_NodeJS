const router = require('express').Router();
const bcrypt = require('bcryptjs')
const UserModel = require('../models/User')

// Lista de Usuarios
router.get('/admin', (req, res) => {
    UserModel.findAll().then(users => {
        res.render('admin/users/index', { users })
    });
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
router.get('/admin/edit/:id', (req, res) => {
    const id = req.params.id
    if(!isNaN(id)) {
        UserModel.findByPk(id).then((user) => {
            if(user != undefined) {
                res.render('admin/users/edit', { user })
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


//Login
router.get('/admin/login', (req, res) => {
    res.render('admin/users/login')
});

router.post('/admin/authenticate', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    UserModel.findOne({ where: { email }})
        .then(user => {
            if(user != undefined) {
                const correct = bcrypt.compareSync(password, user.password);
                if(correct) {
                    req.session.user = { id: user.id, email: user.email }
                    res.json(req.session.user)
                    console.log(req.session.user)
                } else {
                    res.redirect('/users/admin/login')
                }
            } else {
                res.redirect('/users/admin/login')
            }
            res.redirect('/users/admin/login')
        })
        .catch(() => res.redirect('/users/admin/login'))
})

module.exports = router;