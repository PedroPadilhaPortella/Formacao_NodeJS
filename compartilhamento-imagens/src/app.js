const express = require('express')
const app = express()
const mongoose = require('mongoose')

const UserSchema = require('./models/User')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/guiapictures', { useNewUrlParser: true, useUnifiedTopology: true })
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

        const user = new User({ name, email, password });

        await user.save();
        return res.json({ name, email, password })
    } catch (err) {
        return res.status(500).send(err)
    }
});

module.exports = app;