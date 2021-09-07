const database = require('./database');

//NESTED QUERIES
database.insert({nome: 'GTA San Andreas', preco: 14.90}).into('games_knex').then(data => {
    database.select(['id', 'nome']).table("games_knex").then(data => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}).catch(err => {
    console.log(err);
});
