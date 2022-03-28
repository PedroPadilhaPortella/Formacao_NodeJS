var User = require('../models/User');

class UserController 
{
    async getAllUsers(req, res) {
        const users = await User.findAll();
        return res.status(200).json(users);
    }

    async getUserById(req, res) {
        const { id } = req.params;
        const user = await User.findById(id);

        if(user == undefined) return res.status(404).json({});

        return res.status(202).json(user);
    }

    async registerUser(req, res) {
        const nameRegex = /[a-zA-Z][a-zA-Z0-9]{0,9}/g
        const emailRegex = /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/g
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/g
        
        const { name, email, password } = req.body;

        if(name == undefined || name == '') {
            return res.status(400).send('Nome Inválido')
        }

        if(email == undefined || !email.match(emailRegex)) {
            return res.status(400).send('Email Inválido')
        }

        if(password == undefined || password == '') { 
            return res.status(400).send('Senha Inválida')
        }

        const emailAlreadyExist = await User.findEmail(email);
        if(emailAlreadyExist) {
            return res.status(406).send('Email já está sendo usado por outro usuário')
        }

        await User.create(name, email, password);
        return res.status(201).send(req.body)
    }

    async updateUser(req, res) {
        const emailRegex = /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/g
        
        const { name, email, role } = req.body;
        const { id } = req.params

        if(name != undefined && name == '') {
            return res.status(400).send('Nome Inválido')
        }

        if(email != undefined && !email.match(emailRegex)) {
            return res.status(400).send('Email Inválido')
        }

        if(email != undefined) {
            const emailAlreadyExist = await User.findEmail(email);
            if(emailAlreadyExist) {
                res.status(406)
                return res.send('Email já está sendo usado por outro usuário')
            }
        }
            
        var result = await User.update(id, name, email, role);

        if(result != undefined && result.status) {
            res.setHeader('Location', `http://localhost:8686/users/${id}`)
            return res.status(204).end()
        } else {
            return res.status(406).json(result.err)
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        var result = await User.delete(id);

        if(result.status) {
            res.status(200).end();
        } else {
            res.status(406).send(result.err);
        }
    }
}

module.exports = new UserController();