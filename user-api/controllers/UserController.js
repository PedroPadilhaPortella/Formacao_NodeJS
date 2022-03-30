const User = require('../services/User')
const PasswordToken = require('../services/PasswordToken')

class UserController 
{
    async getAllUsers(req, res) {
        const users = await User.findAll()
        return res.status(200).json(users)
    }

    async getUserById(req, res) {
        const { id } = req.params
        const user = await User.findById(id)

        return (user == undefined) ? res.status(404).json({}) : res.status(202).json(user)
    }

    async registerUser(req, res) {
        const nameRegex = /[a-zA-Z][a-zA-Z0-9]{0,9}/g
        const emailRegex = /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/g
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/g
        
        const { name, email, password } = req.body

        if(name == undefined || name == '') {
            return res.status(400).send('Nome Inválido')
        }

        if(email == undefined || !email.match(emailRegex)) {
            return res.status(400).send('Email Inválido')
        }

        if(password == undefined || password == '') { 
            return res.status(400).send('Senha Inválida')
        }

        const emailAlreadyExist = await User.findEmail(email)
        if(emailAlreadyExist) {
            return res.status(406).send('Email já está sendo usado por outro usuário')
        }

        await User.create(name, email, password)
        return res.status(201).send({ name, email, role: 0 })
    }

    async updateUser(req, res) {
        const emailRegex = /^([\w-]\.?)+@([\w-]+\.)+([A-Za-z]{2,4})+$/g
        
        const { name, email, role } = req.body
        const { id } = req.params

        if(name != undefined && name == '') {
            return res.status(400).send('Nome Inválido')
        }

        if(email != undefined && !email.match(emailRegex)) {
            return res.status(400).send('Email Inválido')
        }

        if(role != undefined && role < 0) {
            return res.status(400).send('Cargo Inválido')
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
            return res.status(406).send(result.error)
        }
    }

    async deleteUser(req, res) {
        const { id } = req.params

        var result = await User.delete(id)

        if(result.status) {
            res.status(200).end();
        } else {
            res.status(406).send(result.error)
        }
    }

    async recoverPassword(req, res) {
        const { email } = req.body

        const result = await PasswordToken.create(email)

        if(result.status) {
            res.status(200).json(result.token)
            PasswordToken.sendEmail(email, 'Recuperação de Senha', '', `
    ${result.user.name}, seu pedido de recuperação de senha foi recebido,<br>
    Acesse <a href="http://localhost:8686/change-password">Trocar Senha</a> para recuperar a sua senha.`)
        } else {
            res.status(406).send(result.error)
        }
    }

    async changePassword(req, res) {
        const { token, password } = req.body
        const { status, passwordToken, user } = await PasswordToken.validate(token)

        if(status == false) {
            return res.status(406).send('Token Inválido')
        }

        const result = await User.changePassword(password, passwordToken.userId, passwordToken.token)
        PasswordToken.setUsedToken(token);

        if(result.status) {
            res.status(200).send("Senha alterada com sucesso") 
            PasswordToken.sendEmail(user.email, 'Troca de Senha', '', `${user.name}, sua senha foi alterada com sucesso.`)
        }  else {
            res.status(400).send("Falha ao alterar a senha")
        }
    }
}

module.exports = new UserController();