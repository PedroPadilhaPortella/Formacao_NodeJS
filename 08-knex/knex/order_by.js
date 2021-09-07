const database = require('./database');

database.select().table("games_knex").orderBy("preco", 'desc').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})

database.select().table("games_knex").orderBy("preco", 'asc').then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})