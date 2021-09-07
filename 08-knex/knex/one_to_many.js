const database = require('./database');

// Join One to Many
database.select('games_knex.*', 'estudios.nome as Estudio').orderBy("games_knex.id")
    .table('games_knex').innerJoin('estudios', 'estudios.gameId', 'games_knex.id')
    .then(data => {
        let game = {
            id: 0,
            nome: '',
            estudios: []
        }

        game.id = data[0].id
        game.nome = data[0].nome
        data.forEach(data => game.estudios.push({
            nome: data.Estudio
        }))

        console.log(game)
    }).catch(err => {
        console.log(err)
    });