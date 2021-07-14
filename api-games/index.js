const express = require('express')
const bodyParser = require('body-parser')
let games = require("./db.json")

const port = 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.status(200).end()
});

app.get('/games', (req, res) => {
    res.status(200).json(games)
});

app.get('/games/:id', (req, res) => {
    try {
        const id = req.params.id
        const game = games.find(game => game.id == id)
        if(!game) return res.sendStatus(404)
        return res.status(200).json(game)
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

app.post('/games', (req, res) => {
    try {
        const { id, name, year, price } = req.body
        game = { id, name, year, price }
        games.push(game)
        return res.status(201).send(game)
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
})

app.delete('/games/:id', (req, res) => {
    try {
        const id = req.params.id
        const index = games.findIndex(game => game.id == id)
        if(index == -1) return res.sendStatus(404)
        games.splice(index, 1)
        return res.status(200).end()
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

app.put('/games/:id', (req, res) => {
    try {
        const id = req.params.id
        const index = games.findIndex(game => game.id == id)
        if(index == -1) return res.sendStatus(404)

        game = {}
        const { name, year, price } = req.body
        
        if(id)  game.id = id
        if(name)  game.name = name
        if(year)  game.year = year
        if(price)  game.price = price

        games[index] = game

        return res.status(200).json(game)
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});


app.listen(port, console.log(`API Running at http://localhost:${port}/`))