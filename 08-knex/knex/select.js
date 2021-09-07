const database = require('./database');

database.select(['id', 'nome']).table("games_knex").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});


database.where({ preco: 12.89, id: 1 }).select(['id', 'nome']).table("games_knex").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});


database.where({ preco: 12.89}).orWhere({ preco: 0 }).select(['id', 'nome']).table("games_knex").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

database.whereRaw('preco > 10').select().table("games_knex").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

database.raw('SELECT * FROM games_knex').then(games => console.log(games)).catch(err => console.log(err))
