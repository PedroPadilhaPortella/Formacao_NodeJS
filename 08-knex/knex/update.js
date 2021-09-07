const database = require('./database');

// UPDATE
database.where({ id: 5}).update({ preco: 10 }).table("games_knex").then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});