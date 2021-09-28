const database = require('./database');

// Join Many to Many
database.select(["estudios.nome as Estudio", "games.nome as Game", "games.preco" ])
    .table("games_estudios")
    .innerJoin('games', 'games.id', 'games_estudios.gameId')
    .innerJoin('estudios', 'estudios.id', 'games_estudios.estudioId')
    .then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err)
    });