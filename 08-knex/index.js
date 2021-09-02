const database = require('./database');

const game = [
    { nome: "Minecraft", preco: 12.89},
    { nome: "League of Legends", preco: 12.89},
    { nome: "Call of Duty Mobile", preco: 0},
    { nome: "God of War", preco: 16.89}
]

// var query = database.insert(game).into("games_knex").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

// database.select(['id', 'nome']).table("games_knex").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

//NESTED QUERIES
// database.insert({nome: 'GTA San Andreas', preco: 14.90}).into('games_knex').then(data => {
//     database.select(['id', 'nome']).table("games_knex").then(data => {
//         console.log(data);
//     }).catch(err => {
//         console.log(err);
//     });
// }).catch(err => {
//     console.log(err);
// });

// database.where({ preco: 12.89, id: 1 }).select(['id', 'nome']).table("games_knex").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });


// database.where({ preco: 12.89}).orWhere({ preco: 0 }).select(['id', 'nome']).table("games_knex").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

// database.whereRaw('preco > 10').select().table("games_knex").then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });

// database.raw('SELECT * FROM games_knex').then(games => console.log(games)).catch(err => console.log(err))

// let query = database.where({ id: 6 }).table('games_knex').delete().then(data => {
//     console.log(data);
// }).catch(err => {
//     console.log(err);
// });
// console.log(query);