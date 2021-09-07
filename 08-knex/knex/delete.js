const database = require('./database');

database.where({ id: 6 }).table('games_knex').delete().then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});