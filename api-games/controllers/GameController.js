const router = require('express').Router();
const GameModel = require('../models/Game')
const { authenticate } = require('../middlewares')
const { generateLinks } = require('../utils/hateoas')

router.get('/games', authenticate, async(req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Endpoint para obter todos os Games.'
    const HATEOAS = generateLinks([{href: 'games', method: 'POST', rel: 'add_game'}])

    const games = await GameModel.findAll();
    res.status(200).json({ games, _links: HATEOAS })
});

router.get('/games/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        const game = await GameModel.findOne({where: {id}})
        if(!game) return res.sendStatus(404)

        const HATEOAS = [
            {href: 'http:localhost:3000/games', method: 'POST', rel: 'add_game'},
            {href: `http:localhost:3000/games/${id}`, method: 'PUT', rel: 'update_game'},
            {href: `http:localhost:3000/games/${id}`, method: 'DELETE', rel: 'delete_game'}
        ];

        return res.status(200).json({game, _links: HATEOAS })
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post('/games', authenticate, async(req, res) => {
    try {
        let game = { ...req.body }
        game = await GameModel.create(game)

        const HATEOAS = [
            {href: `http:localhost:3000/games/${game.id}`, method: 'GET', rel: 'get_game'},
            {href: `http:localhost:3000/games/${game.id}`, method: 'PUT', rel: 'update_game'},
            {href: `http:localhost:3000/games/${game.id}`, method: 'DELETE', rel: 'delete_game'}
        ];

        return res.status(201).send({ game, _links: HATEOAS });
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
})

router.delete('/games/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        await GameModel.destroy({ where: { id }})
        return res.status(200).end()
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

router.put('/games/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        const gameDB = await GameModel.findOne({where: {id}})
        if(!gameDB) return res.sendStatus(404)
        
        let game = { ...req.body }
        await GameModel.update(game, { where: { id }})

        const HATEOAS = [
            {href: `http:localhost:3000/games/${id}`, method: 'GET', rel: 'get_game'},
            {href: `http:localhost:3000/games/${id}`, method: 'PUT', rel: 'update_game'},
            {href: `http:localhost:3000/games/${id}`, method: 'DELETE', rel: 'delete_game'}
        ];

        return res.status(200).send({ _links: HATEOAS })
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

module.exports = router;