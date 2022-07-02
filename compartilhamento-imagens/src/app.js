const express = require('express')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose')

const app = express()
const jwtSecret = 'tdd-project';

const UserSchema = require('./models/User')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/guiapics', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {})
    .catch((err) => console.error(err));

const User = mongoose.model('User', UserSchema);

app.get('/', (req, res) => {
    res.json({});
})

app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (name == '' || email == '' || password == '') {
            return res.status(400).end();
        }

        const userExists = await User.findOne({'email': email})
        if (userExists) {
            return res.status(400).json({ error: 'Este email já está em uso por outro usuário.'})
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({ name, email, password: hash });

        await user.save();
        return res.json({ name, email })
    } catch (err) {
        return res.status(500).send(err)
    }
});

app.post('/login', async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({'email': email})
    if (!user) {
        return res.status(403).json({ errors: { email: 'Email não cadastrado.'}})
    }
    
    const isPassword = await bcrypt.compare(password, user.password);
    if(!isPassword) {
        return res.status(403).json({ errors: { password: 'Senha incorreta.'}})
    }

    jwt.sign({ email, name: user.name, id: user._id }, jwtSecret, { expiresIn: '48h' }, (err, token) => {
        if(err) {
            console.error(err)
            return res.status(500).end()
        }
        return res.json({ token });
    });
});

app.delete('/users/:name', async (req, res) => {
    const name = req.params.name;
    await User.deleteMany({ 'name': name});
    res.status(200).end();
});


module.exports = app;