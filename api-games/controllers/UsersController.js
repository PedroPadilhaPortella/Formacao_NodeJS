const router = require('express').Router();
const UsersModel = require('../models/Users')

const jwt = require('jsonwebtoken')
const { JWTSecret } = require('../utils')
const { authenticate } = require('../middlewares')

const { generateLinks } = require('../utils/hateoas')

router.get('/users', async(req, res) => {
    const users = await UsersModel.findAll();
    const HATEOAS = generateLinks([{href: 'users', method: 'POST', rel: 'register_user'}])
    res.status(200).json({users, _links: HATEOAS })
});

router.get('/users/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        const user = await UsersModel.findOne({where: {id}})
        if(!user) return res.sendStatus(404)

        const HATEOAS = [
            {href: 'http:localhost:3000/users', method: 'POST', rel: 'add_user'},
            {href: `http:localhost:3000/users/${id}`, method: 'PUT', rel: 'update_user'},
            {href: `http:localhost:3000/users/${id}`, method: 'DELETE', rel: 'delete_user'}
        ];

        return res.status(200).json({user, _links: HATEOAS })
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post('/users', authenticate, async(req, res) => {
    try {
        user = { ...req.body }
        user = await UsersModel.create(user);

        const HATEOAS = [
            {href: `http:localhost:3000/users/${user.id}`, method: 'GET', rel: 'get_user'},
            {href: `http:localhost:3000/users/${user.id}`, method: 'PUT', rel: 'update_user'},
            {href: `http:localhost:3000/users/${user.id}`, method: 'DELETE', rel: 'delete_user'}
        ];

        return res.status(201).send({user, _links: HATEOAS })
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
})

router.delete('/users/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        await UsersModel.destroy({ where: { id }})
        return res.status(200).end()
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

router.put('/users/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        const userDB = await UsersModel.findOne({where: {id}})
        if(!userDB) return res.sendStatus(404)
        
        let user = { ...req.body }
        await UsersModel.update(user, { where: { id }})

        const HATEOAS = [
            {href: `http:localhost:3000/users/${id}`, method: 'GET', rel: 'get_user'},
            {href: `http:localhost:3000/users/${id}`, method: 'PUT', rel: 'update_user'},
            {href: `http:localhost:3000/users/${id}`, method: 'DELETE', rel: 'delete_user'}
        ];

        return res.status(200).end()
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post('/auth', async(req, res) => {
    try {
        var { email, password } = req.body
        if(!email || !password)  return res.status(400).json({ message: 'Email ou Senha Inv??lidos'})
        
        const user = await UsersModel.findOne({ where: { email }})
        if(!user)  return res.status(404).json({ message: 'Usu??rio n??o Encontrado'})
        if(password !== user.password)  res.status(401).json({ message: 'Senha Incorreta'})

        jwt.sign(
            { id: user.id, email: user.email },
            JWTSecret,
            { expiresIn: '12h' },
            (err, token) => {
                if(err) res.status(500).send({ message: 'Erro, tente logar novamente mais tarde'})
                return res.status(200).json({ token });                
            }
        );

    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

module.exports = router;