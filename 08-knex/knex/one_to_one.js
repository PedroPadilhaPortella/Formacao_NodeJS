const database = require('./database');

// Join
database.select('games_knex.*', 'estudios.nome as Estudio').orderBy("games_knex.id")
    .table('games_knex').innerJoin('estudios', 'estudios.gameId', 'games_knex.id')
    .then(games => console.log(games)).catch(err => console.log(err))

// Join com where
database.select('games_knex.*', 'estudios.nome as Estudio').orderBy("games_knex.id")
    .table('games_knex').innerJoin('estudios', 'estudios.gameId', 'games_knex.id')
    .where({ 'games_knex.id': 2 })
    .then(games => console.log(games)).catch(err => console.log(err))