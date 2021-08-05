const router = require('express').Router();
const GameModel = require('../models/Game')
const { authenticate } = require('../middlewares')

router.get('/games', authenticate, async(req, res) => {
    // #swagger.tags = ['Games']
    // #swagger.description = 'Endpoint para obter todos os Games.'
    
    const games = await GameModel.findAll();
    res.status(200).json(games)
});

router.get('/games/:id', authenticate, async(req, res) => {
    try {
        const id = req.params.id
        const game = await GameModel.findOne({where: {id}})
        if(!game) return res.sendStatus(404)
        return res.status(200).json(game)
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post('/games', authenticate, async(req, res) => {
    try {
        game = { ...req.body }
        game = await GameModel.create(game);
        return res.status(201).send(game)
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

        return res.status(200).end()
    } catch(err) {
        return res.status(500).send({ message: err.message })
    }
});

module.exports = router;